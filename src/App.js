import React, { Component } from 'react';
import './App.css';
import './nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';

import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';


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

    let offlineText = '';

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
    if (!navigator.onLine) {
      offlineText = 'You are not connected to the internet. Please note: Loaded data is from your previous visit.';
    }

    this.setState({ showWelcomeScreen: !(code || isTokenValid) || this.props.isTestMode, offlineText });

  }


  componentWillUnmount() {
    this.mounted = false;
  }

  getData = () => {
    const { locations, events } = this.state;
    //console.log(this.state)
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  updateEvents = (location = 'all', eventCount) => {
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    } else (
      this.setState({ numberOfEvents: eventCount })
    )
    if (location === undefined) {
      location = this.state.currentLocation;
    }
    //console.log(eventCount, location)

    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, eventCount),
          numberOfEvents: eventCount,
          currentLocation: location,
          locations: extractLocations(events)
        });
      }
    });
  }

  render() {
    //if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    const { events, locations, updateEvents } = this.state;

    return (
      <div className="App">
        <OfflineAlert text={this.state.offlineText} />
        <h1>Meet App</h1>
        <h4>Search your city here:</h4>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <br />
        <h4>Number of Events:</h4>
        <NumberOfEvents updateEvents={this.updateEvents} events={this.state.events} />
        <h4 className='upcoming-events'>Upcoming Events:</h4>
        <ResponsiveContainer height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid />
            <XAxis dataKey="city" name="city" type="category" />
            <YAxis dataKey="number" name="number of events" type="number" allowDecimals={false} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        <EventList events={this.state.events} />


      </div>
    );
  }
}

export default App;

//Add back under OfflineAlert in return():
//<WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={getAccessToken} />