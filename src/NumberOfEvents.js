import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorText: '',
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value <= 0 || typeof value === 'number') {
      this.setState({
        numberOfEvents: '',
        errorText: 'Please enter a number between 1 and 32',
      })
    } else {
      this.setState({
        numberOfEvents: value,
        errorText: '',
      });
    }
    this.props.updateEvents(undefined, value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="number"
          className="inputNumberOfEvents"
          onChange={this.handleInputChanged}
          value={this.state.numberOfEvents}
        />
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;