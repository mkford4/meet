import React, { Component } from 'react';
import './App.css';
import './nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';

import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: undefined,
  }

  async componentDidMount() {
    this.mounted = true;

    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
    if (!navigator.onLine) {
      this.setState({
        offlineText: 'You are not connected to the internet. Please note: Loaded data is from your previous visit.',
      });
    } else {
      this.setState({
        offlineText: '',
      });
    }
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
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    const { events, locations, numberOfEvents } = this.state;

    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Search your city here:</h4>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <br />
        <h4>Number of Events:</h4>
        <NumberOfEvents updateEvents={this.updateEvents} events={this.state.events} />
        <h4 className='upcoming-events'>Upcoming Events:</h4>
        <EventList events={this.state.events} />
        <OfflineAlert text={this.state.offlineText} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
