const router = require("express").Router();
const eventsCtrl = require("../controllers/eventsCtrl");
const routeSecure = require("../../middleware/route_secure");
const routeAdmin = require("../../middleware/routeAdmin");
const { check, oneOf } = require("express-validator/check");

router.get("/events", eventsCtrl.getAllEvents);

router.post(
  "/events/event",
  routeAdmin,
  check("name").isAlphanumeric(),
  check("date").isISO8601(),
  check("ticketQty").isInt({ min: 1 }),
  check("ticketPrice").isDecimal({ decimal_digits: "1,2" }),
  eventsCtrl.addEvent
);

router.get("/events/event/:id", eventsCtrl.getOneEvent);
router.delete("/events/event/:id", routeAdmin, eventsCtrl.deleteOneEvent);

router.get("/events/event/:id/tickets", eventsCtrl.getEventTickets);

router.post(
  "/events/event/:id/buy",
  check("email").isEmail().normalizeEmail(),
  check("amountInEuroCents").isInt({ min: 1 }),
  check("ticketsBought").isInt({ min: 1 }),  
  eventsCtrl.buyTickets
);
router.post("/events/event/:id/charge", routeSecure, eventsCtrl.charge);

module.exports = router;
