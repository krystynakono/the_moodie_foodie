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

  // Once an image has been uploaded, the 'Go!' button will render.
  // On click this button fires the upload image function.
  showGoButton(screenshot) {
    if (screenshot) {
      return (
        <button onClick={this.uploadImage.bind(this)}>Go</button>
      );
    }
  }

  // this function fires on a button click and sets the state to the image file
  // getScreenshot is a built in function of the react-webcam component
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

  // Send image to AWS S3 to get a url back
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

  // Webcam will render if no image is saved in state
  showWebcam(screenshot) {
    if (this.state.screenshot === null) {
      return (
        <div className="selfie">
          <Webcam
            ref={"webcam"}
            id={"webcam"}
            audio={false}
            screenshotFormat={"image/jpeg"}
            height={'100%'}
            width={'50%'}
          />
          <button onClick={this.takeScreenshot.bind(this)}>take a selfie</button>
        </div>
      );
    }

    // if a screenshot is saved in state, the screnshot will display on the page
    // if the user chooses to retake the image, it will reset the state of screenshot
    // to null and the webcam will display instead of the photo.
    if (this.state.screenshot) {
      return (
        <div className="selfie">
          <img src={this.state.screenshot} alt="self"/>
          <button onClick={this.tryAgain.bind(this)}>Take another selfie.</button>
          <button onClick={this.uploadImage.bind(this)}>That's a keeper. Time to eat.</button>

        </div>
      );
    }
  }

  // reset the state of screenshot to null in order to remove the image that was rendered
  // and rerender the webcam
  tryAgain() {
    this.setState({
      screenshot: null,
    });
  }

  render() {
    return (
      <div className="selfie-container">
        { this.showWebcam(this.state.screenshot)}
      </div>
    );
  }
}

export default Webcamera;
