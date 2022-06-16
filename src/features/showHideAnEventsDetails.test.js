import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import Event from '../Event';
import { mockData } from '../mock-data';

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
    let EventWrapper;
    let event;
    given('the user has view of events list', async () => {
      event = mockData[0];
      EventWrapper = shallow(<Event event={event} />);
    });
    when('the user clicks on an event', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });
    then('the event expands with further details', () => {
      expect(EventWrapper.find('.more-details')).toHaveLength(1);
    });
  });


  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let EventWrapper;
    let event;
    given('the user has view of events list', async () => {
      event = mockData[0];
      EventWrapper = shallow(<Event event={event} />);
      EventWrapper.find('.details-btn').simulate('click');
    });
    when('the user clicks on an expanded event', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });
    then('the event collapses within list of events', () => {
      expect(EventWrapper.find('.more-details')).toHaveLength(0);
    });
  });
});