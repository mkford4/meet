import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
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
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let NumberOfEventsWrapper;
    given('user has view of events list and wants to change how many events are listed', async () => {
      AppWrapper = await mount(<App />);
    });
    when('user clicks to change number of events to X', () => {
      NumberOfEventsWrapper.find('.inputNumberOfEvents').simulate('change', { target: { value: '1' } });
    });
    then('main view displays amount of events user has specified', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(1);
    });
  });
});