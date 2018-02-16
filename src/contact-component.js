import React, { Component } from 'react';

export default class ContactComponent extends Component {

  render() {
    return (
      <div className="contact-form">
        <h3>Contact Crisis Center</h3>
        <div>
         details 
        </div>
        <div>
          <div>
            <label>Message: </label>
          </div>
          <div>
            <textarea 
              rows="10" 
              cols="35" 
              ></textarea>
          </div>
        </div>
        <p>
          <button onClick={ this.props.close }>Send</button>
          <button onClick={ this.props.close }>Cancel</button>
        </p>
      </div>
    );
  }
}
