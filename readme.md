# TICKET-SELLING PLATFORM

In order to work you must first fill config.js.
Databese: MySQL

This is how I see it - as Node RESTful API.

Route GET "/api/events" - array of all events in JSON

Route POST "/events/event" - add event

Route GET "/events/event/:id" - object of one event details in JSON

Route POST "/events/event/:id/buy" - buy tickets

TODO

- more routes(delete event)
- secure routes
- tests !!!!
- think over morre time
