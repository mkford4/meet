import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    alertText: '',
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 32) {
      this.setState({
        numberOfEvents: '',
        alertText: 'Please enter a number 1 to 32',
      });
    } else {
      this.setState({
        numberOfEvents: value,
        alertText: '',
      });
    }


  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="number"
          className="inputNumberOfEvents"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    )
  }
}

export default NumberOfEvents;