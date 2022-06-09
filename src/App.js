import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';
//import { OfflineAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location = 'all', eventCount) => {
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    } else (
      this.setState({ numberOfEvents: eventCount })
    )
    if (location === undefined) {
      location = this.state.currentLocation;
    }
    console.log(eventCount, location)

    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, eventCount),
          numberOfEvents: eventCount,
          currentLocation: location,
        });
      }
    });
  }

  render() {
    const { events, locations, numberOfEvents } = this.state;
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Search your city here:</h4>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <br />
        <h4>Number of Events:</h4>
        <NumberOfEvents updateEvents={this.updateEvents} events={this.state.events} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
