const router = require("express").Router();
const eventsCtrl = require("../controllers/eventsCtrl");
const routeSecure = require("../../middleware/route_secure");
const routeAdmin = require("../../middleware/routeAdmin");

router.get("/events", eventsCtrl.getAllEvents);

router.post("/events/event", routeAdmin, eventsCtrl.addEvent);

router.get("/events/event/:id", eventsCtrl.getOneEvent);
router.delete("/events/event/:id", routeAdmin, eventsCtrl.deleteOneEvent);

router.get("/events/event/:id/tickets", eventsCtrl.getEventTickets);

router.post("/events/event/:id/charge", routeSecure, eventsCtrl.buyTickets);

module.exports = router;
