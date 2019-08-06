import React, { Component } from "react";

class Email extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={this.props.className}>
          <div className="YourEmail"> Your Email </div>
          <input
            id="emailField"
            placeholder="you@example.com"
            type="text"
            name="email"
            value={this.props.value} 
            onChange={this.props.onChange}
          />
      </div>
    );
  }
}

export default Email;
