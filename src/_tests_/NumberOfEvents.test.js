import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);
  });

  test('change numberOfEvents when value input is changed', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: '32' });
    NumberOfEventsWrapper.find('.inputNumberOfEvents').simulate('change', {
      target: { value: "7" },
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual('7');
  });

});



