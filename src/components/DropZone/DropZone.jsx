import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './DropZone.css';

class DropzoneBox extends Component {

  // onDrop(files) {
  //   console.log('Recieved files: ', files);
  // }

  render() {
    return (
      <div className="drop-zone-button">
        <div className="drop-it-here">
          <Dropzone
            onDrop={this.props.saveImage}
            multiple={false}
            accept="image/*"
            className="drop-it-like-its-hot"
          >
            <div>
              <p>Drop a file here, or click to select a file to upload.</p>
            </div>
          </Dropzone>
          {this.props.photo !== '' ? <div id="dropzone-pic">
            <img src={this.props.photo.preview} alt="image" />
          </div> : null}
        </div>
        <button onClick={this.props.uploadImage}>Go!</button>
      </div>
    );
  }
}

export default DropzoneBox;
