Feature: Specify number of events

Scenario: When user hasn't specified a number, 32 is the default
Given user has view of events list
When user hasn’t clicked to specify amount of events to view
Then the number of events listed is by default 32 maximum

Scenario: User can change the number of events they want to see
Given user has view of events list and wants to change how many events are listed
When user clicks to change number of events to X
Then main view displays amount of events user has specified