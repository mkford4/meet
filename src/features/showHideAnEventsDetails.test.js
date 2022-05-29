import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppWrapper;
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user has view of events list', () => {
      AppWrapper = mount(<App />);
    });
    when('the user doesn’t click on any event', () => {

    });
    then('the event is collapsed automatically', () => {
      expect(AppWrapper.find('.more-details')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the user has view of events list', async () => {
      AppWrapper = await mount(<App />);
    });
    when('the user clicks on an event', () => {
      AppWrapper.update();
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });
    then('the event expands with further details', () => {
      expect(AppWrapper.find('.more-details')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('the user has view of events list', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });
    when('the user clicks on an expanded event', () => {
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });
    then('the event collapses within list of events', () => {
      expect(AppWrapper.find('.more-details')).toHaveLength(0);
    });
  });
});