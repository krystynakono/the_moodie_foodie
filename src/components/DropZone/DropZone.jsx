import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './DropZone.css';

class DropzoneBox extends Component {

  // onDrop(files) {
  //   console.log('Recieved files: ', files);
  // }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.props.saveImage}>
          <div>Try dropping some files here, or click to select files to upload. </div>
        </Dropzone>
        {this.props.selfie !== '' ? <div id="dropzone-pic">
          <img src={this.props.selfie['preview']} alt="image" />
        </div> : null}
        <button onClick={this.props.uploadImage}>Go!</button>
      </div>
    );
  }
}

export default DropzoneBox;
