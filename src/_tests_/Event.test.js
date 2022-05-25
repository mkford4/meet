import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event />);
  });


  test('render an event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('render an event location', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
  });

  test('render an event start date', () => {
    expect(EventWrapper.find('.start-date')).toHaveLength(1);
  });

  test('event details are collapsed automatically', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

  test('render details button', () => {
    expect(EventWrapper.find('.details-button')).toHaveLength(1);
  });

  test('render event details when details-button is clicked', () => {
    EventWrapper.setState({ collapsed: true });
    EventWrapper.find('.details-button').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('hide event details when details-button is clicked once more', () => {
    EventWrapper.setState({ collapsed: false });
    EventWrapper.find('.hide-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  })

})