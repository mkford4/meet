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
import EventGenre from './EventGenre';
import { Col, Container, Row, Navbar } from 'react-bootstrap';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32, //default value
    showWelcomeScreen: undefined,
  }

  constructor(props) {
    super(props)

    this.goAppOffline = this.goAppOffline.bind(this)
    this.goAppOnline = this.goAppOnline.bind(this)
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
    } else {
      this.updateEvents()
    }

    if (!navigator.onLine) {
      offlineText = 'You are not connected to the internet. Please note: Loaded data is from your previous visit.';
    }

    this.setState({ showWelcomeScreen: !(code || isTokenValid) || this.props.isTestMode, offlineText });

    window.addEventListener('offline', this.goAppOffline);
    window.addEventListener('online', this.goAppOnline);
  }

  goAppOffline() {
    console.log('i am offline')
    this.setState({
      offlineText: 'You are not connected to the internet. Please note: Loaded data is from your previous visit.'
    })
  }

  goAppOnline() {
    console.log('i am online')
    this.setState({
      offlineText: ''
    })
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
    const { events, locations, updateEvents, accessToken } = this.state;
    if (!accessToken) {
      return <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={getAccessToken} />
    } else {

      return (
        <div className="App">
          <Navbar fixed='top' bg='light' expand='lg'>
            <Container className='navbar-brand-wrapper'>
              <ul className='navbar-nav mx-auto'>
                <li>
                  <a className='navbar-brand'>Meet App</a>
                </li>
              </ul>
            </Container>
          </Navbar>

          <div className="search-wrapper">
            <h4>Search your city here:</h4>
            <CitySearch
              locations={this.state.locations}
              updateEvents={this.updateEvents}
            />
            <br />
            <h3>Number of events:</h3>
            <NumberOfEvents
              updateEvents={this.updateEvents}
              events={this.state.events}
            />
          </div>
          <div className='data-vis-wrapper'>
            <EventGenre events={events} />
            <ResponsiveContainer height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid />
                <XAxis dataKey="city" name="city" type="category" />
                <YAxis dataKey="number" name="number of events" type="number" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={this.getData()} fill="#f28444" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <h4 className='upcoming-events'>Upcoming Events:</h4>
          <EventList events={this.state.events} />

          <div className="alert">
            {!navigator.onLine ? (
              <OfflineAlert text={this.state.offlineText} />
            ) : ('')}
          </div>

        </div>

      );
    }
  }
}

export default App;

//<WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={getAccessToken} />