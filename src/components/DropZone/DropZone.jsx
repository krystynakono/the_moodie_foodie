import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

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
      </div>
    );
  }
}

export default DropzoneBox;
