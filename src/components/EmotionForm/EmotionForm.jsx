import React, { Component } from 'react';
import './EmotionForm.css';

class EmotionForm extends Component {

  render() {
    return (
      <div className="emotion-form-container">
        <h2>I'm feeling rather...</h2>
        <div id="emotion-form" ref="emotionform">
          <select onChange={this.props.moodUpdate}>
            <option value="happy">happy</option>
            <option value="sad">sad</option>
            <option value="angry">hangry</option>
            <option value="surprised">surprised</option>
            <option value="contempt">contempt</option>
            <option value="disgust">disgusted</option>
            <option value="fear">afraid</option>
            <option value="neutral">neutral</option>
          </select>
          <button id="feelings-selector">Go!</button>
        </div>
      </div>
    );
  }
}

export default EmotionForm;
