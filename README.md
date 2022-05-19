# meet
Objective: To build a serverless, progressive web application (PWA) with React using a test-driven
development (TDD) technique. The application uses the Google Calendar API to fetch
upcoming events.

--------------- MEET APP USER STORIES: -------------------

FEATURE 1: FILTER EVENTS BY CITY
As a USER, I should be able to FILTER EVENTS BY CITY, so that I CAN NARROW MY SEARCH.
SCENARIO 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.
- Given user hasn’t searched for any city
- When the user opens the app
- Then the user should see a list of all upcoming events
SCENARIO 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.
- Given the main page is open
- When user starts typing in the city textbox
- Then the user should see a list of cities (suggestions) that match what they’ve typed
SCENARIO 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.
- Given the user was typing “Berlin” in the city textbox
  And the list of suggested cities is showing
- When the user selects a city (e.g., “Berlin, Germany”) from the list
- Then their city should be changed to that city (i.e., “Berlin, Germany”)
  And the user should receive a list of upcoming events in that city

FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS
As a USER, I should be able to CLICK ON AN EVENT TO EITHER EXPAND OR COLLAPSE IT so that I CAN VIEW OR HIDE EVENTS' DETAILS WHEN DESIRED.
SCENARIO 1: AN EVENT ELEMENT IS COLLAPSED BY DEFAULT
- Given the user has view of events list
- When the user doesn’t click on any event
- Then the event is collapsed automatically
SCENARIO 2: USER CAN EXPAND AN EVENT TO SEE ITS DETAILS
- Given the user has view of events list
- When the user clicks on an event
- Then the event expands with further details
SCENARIO 3: USER CAN COLLAPSE AN EVENT TO HIDE ITS DETAILS
- Given the user has view of events list
- When the user clicks on an expanded event
- Then the event collapses within list of events

FEATURE 3: SPECIFY NUMBER OF EVENTS
As a USER, I should be able to SPECIFY THE NUMBER OF EVENTS so that I CAN CHANGE HOW MANY EVENTS ARE ON DISPLAY AT A GIVEN TIME/SEARCH.
SCENARIO 1: WHEN USER HASN’T SPECIFIED A NUMBER, 32 IS THE DEFAULT NUMBER
- Given user has view of events list
- When user hasn’t clicked to specify amount of events to view
- Then the number of events listed is by default 32 maximum
SCENARIO 2: USER CAN CHANGE THE NUMBER OF EVENTS THEY WANT TO SEE
- Given user has view of events list and wants to change how many events are listed
- When user clicks to change number of events to X
- Then main view displays amount of events user has specified

FEATURE 4: USE THE APP WHEN OFFLINE
As a USER, I should be able to USE THE APP WHEN OFFLINE so that I CAN SEE EVENT INFORMATION WITHOUT INTERNET.
SCENARIO 1: SHOW CACHED DATA WHEN THERE’S NO INTERNET CONNECTION
- Given user is using app while offline
- When user opens app
- Then app shows cached data available in display
SCENARIO 2: SHOW ERROR WHEN USER CHANGES THE SETTINGS (CITY, TIME RANGE)
- Given user is using app while offline
- When user adjusts search settings
- Then an error displaying offline status appears

FEATURE 5: DATA VISUALIZATION
As a USER, I should be able to VIEW CHARTS DISPLAYING UPCOMING EVENTS IN EACH CITY so that I CAN EASILY & QUICKLY SEE EVENTS WITHOUT SEARCHING YET.
SCENARIO 1: SHOW A CHART WITH THE NUMBER OF UPCOMING EVENTS IN EACH CITY
- Given user opens app and doesn’t yet search a city
- When user sees list of all upcoming events (see Feature 1)
- Then chart displays number of upcoming events in each city

----------------------------------------------------------------------

Tools used:
- React
- TDD technique
- Serverless functions
- Google Calendar API
- OAuth2 authentication flow
- GitHub Pages
