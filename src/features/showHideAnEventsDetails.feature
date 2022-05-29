Feature: Show/hide an event's details

Scenario: An event element is collapsed by default
Given the user has view of events list
When the user doesn’t click on any event
Then the event is collapsed automatically

Scenario: User can expand an event to see its details
Given the user has view of events list
When the user clicks on an event
Then the event expands with further details

Scenario: User can collapse an event to hide its details
Given the user has view of events list
When the user clicks on an expanded event
Then the event collapses within list of events