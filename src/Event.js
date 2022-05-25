import React, { Component } from 'react';

class Event extends Component {
  state = {
    collapsed: true,
  }

  handleClick = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  };

  render() {
    return <div className="event">
      <div className="location"></div>
      <div className="start-date"></div>
      <button
        className="details-button"
        onClick={this.handleClick}
      >Details</button>

      <button //need to write code to toggle hide this button and details button still
        className="hide-details"
        onClick={this.handleClick}
      >Hide Details</button>
    </div>
  }
}
export default Event;