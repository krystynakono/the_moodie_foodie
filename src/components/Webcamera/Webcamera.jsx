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

  takeScreenshot() {
    const screenshot = this.refs.webcam.getScreenshot();
    console.log('Take selfie');
    this.setState(
      { screenshot },
    );
  }

  render() {
    return (
      <div id="selfie">
        <Webcam
          ref="webcam"
          id="webcam"
        />
        <div className='screenshots' ref="boo">
          <div className='controls'>
            <button onClick={this.takeScreenshot.bind(this)}>Take a selfie!</button>
          </div>
          { this.state.screenshot ? <img src={this.state.screenshot} /> : null }
        </div>
      </div>
    );
  }
}

export default Webcamera;
