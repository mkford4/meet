import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import { mockData } from '../mock-data';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppWrapper;
  test('When user hasn\'t specified a number, 32 is the default', ({ given, when, then }) => {
    given('user has view of events list', async () => {
      AppWrapper = await mount(<App />);
    });
    when('user hasn’t clicked to specify amount of events to view', () => {
      AppWrapper.update();
    });
    then('the number of events listed is by default 32 maximum', () => {
      expect(AppWrapper.state('numberOfEvents')).toEqual(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('user has view of events list and wants to change how many events are listed', async () => {
      AppWrapper = await mount(<App />);
      expect(AppWrapper.find('.event'));
    });
    when('user clicks to change number of events to X', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.find('.inputNumberOfEvents').simulate('change', { target: { value: '1' } });
    });
    then('main view displays amount of events user has specified', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.find('.inputNumberOfEvents').simulate('change', { target: { value: '1' } });
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual('1');
    });
  });
});