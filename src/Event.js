import React, { Component } from 'react';

class Event extends Component {
  state = {
    event: {},
    collapsed: true,
  }

  handleClick = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    return (
      <div className="event">
        <div className="location"></div>
        <div className="start-date"></div>
        <button
          className={`details-btn ${collapsed ? "show" : "hide"}-details`}
          onClick={this.handleClick}
        >{collapsed ? "Show Details" : "Hide Details"}</button>

        {!collapsed && (
          <div
            className={`more-details ${this.state.collapsed ? "hide" : "show"}`}
          >
            <h4>Event Details:</h4>
          </div>
        )}
      </div>
    );
  }
}
export default Event;