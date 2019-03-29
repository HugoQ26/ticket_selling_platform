const router = require("express").Router();
const eventsCtrl = require("../controllers/eventsCtrl");
//const routeSecure = require("../../middleware/route_secure");
// routeAdmin = require("../../middleware/routeAdmin");
const { check } = require("express-validator/check");

router.get("/events", eventsCtrl.getAllEvents);

//add routeAdmin later
router.post(
  "/events/event",
  check("name").isAlphanumeric(),
  check("date").isISO8601(),
  check("ticketQty").isInt({ min: 1 }),
  check("ticketPrice").isInt({ min: 1 }),
  eventsCtrl.addEvent
);

router.get("/events/event/:id", eventsCtrl.getOneEvent);

router.post(
  "/events/event/:id/buy",
  check("email")
    .isEmail()
    .normalizeEmail(),
  check("amountInEuroCents").isInt({ min: 1 }),
  check("ticketsBought").isInt({ min: 1 }),
  eventsCtrl.buyTickets
);

module.exports = router;
