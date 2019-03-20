# TICKET-SELLING PLATFORM

This is how I see it - as Node RESTful API.

Route GET "/api/events" - array of all events in JSON

Route POST "/events/event" - add event - secured

Route GET "/events/event/:id" - object of one event details in JSON
Route DELETE "/events/event/:id" - delete event - secured

Route GET "/events/event/:id/tickets" - quantity of available tickets

router.post("/events/event/:id/charge", routeSecure, eventsCtrl.buyTickets);



