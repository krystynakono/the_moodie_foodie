import React, { Component } from 'react';
import Webcam from 'react-webcam';
import './Webcamera.css';

class Webcamera extends Component {

  constructor() {
    super();

    this.state = {
      screenshot: null,
    };
  }

  showGoButton(screenshot) {
    if (screenshot) {
      return (
        <button onClick={this.uploadImage.bind(this)}>Go</button>
      );
    }
  }

  takeScreenshot() {
    const screenshot = this.refs.webcam.getScreenshot();
    console.log('Take selfie');
    this.setState(
      { screenshot },
    );
  }

  // Convert Data URI to File then append to FormData
  // code attributed to the following stack overflow post
  // http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  uploadImage() {
    // convert the selfie string into a blob using dataURLtoBlob function
    const blob = this.dataURItoBlob(this.state.screenshot);

    // Make a new form and append the blob file as the value to the key photo
    const formData = new FormData();
    formData.append('photo', blob);
    // send form to upload post request
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
    .then(r => r.json())
    .then((response) => {
      console.log('image uploaded', response);
      this.props.determineEmotion(response);
    })
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="selfie-container">
        <div id="selfie">
          <Webcam
            ref={"webcam"}
            id={"webcam"}
            audio={false}
            screenshotFormat={"image/jpeg"}
            height={'100%'}
            width={'50%'}

          />
          <div className="screenshots">
            { this.state.screenshot ? <img src={this.state.screenshot} /> : null }
          </div>
        </div>
        <div className='controls'>
          <button onClick={this.takeScreenshot.bind(this)}>Take a selfie!</button>
          {this.showGoButton(this.state.screenshot)}
        </div>
      </div>
    );
  }
}

export default Webcamera;
