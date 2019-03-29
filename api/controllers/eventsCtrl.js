//const Events = require("../database/eventsDb");
const Events = require("../database/sqlEvents");
const Tickets = require("../database/sqlTickets");
const Payment = require("./payment");
const debug = require("debug")("events:eventsCtrl");
const { validationResult } = require("express-validator/check");
const sequelize = require("../database/sqlDb");

module.exports = class EventsCtrl {
  static getAllEvents(req, res, next) {
    (async () => {
      console.time("start");

      try {
        let limit = req.query.limit || "";
        const all = await Events.getAllEvents();
        res.json(all);
      } catch (err) {
        res.status(500);
        next(err);
      }
    })();
  }

  static getOneEvent(req, res, next) {
    const { id } = req.params;

    (async () => {
      try {
        const event = await Events.getOneEvent(id);
        event === null
          ? res.status(404).json({ message: "No Event found" })
          : res.json(event);

        debug("GetOneEvent OK - ", req.method, req.originalUrl, res.statusCode);
      } catch (err) {
        res.status(500);
        next(err);
      }
    })();
  }

  static addEvent(req, res, next) {
    const { name, date, ticketQty, ticketPrice } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Validation Error", err: errors.array() });
    }
    (async () => {
      try {
        const event = await Events.addEvent(name, date, ticketQty, ticketPrice);
        res.status(201).json({ message: "Event added", event });
      } catch (err) {
        res.status(500);
        next(err);
      }
    })();
  }

  static buyTickets(req, res, next) {
    const { amountInEuroCents, email, ticketsBought, token } = req.body;
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Validation Error", err: errors.array() });
    }

    (async () => {
      let transaction;
      try {
        transaction = await sequelize.transaction();
        const tickets = await Events.incDecTickets(
          id,
          ticketsBought,
          transaction
        );
        const { amount, currency } = await Payment.charge(
          amountInEuroCents,
          token
        );
        const savePurchase = await Tickets.addTicket(
          Date.now(),
          id,
          email,
          ticketsBought,
          amountInEuroCents,
          transaction
        );

        await transaction.commit();
        res.json({
          message: "Tickets purchuased sucessfully",
          purchase: {
            eventId: id,
            ticketsBought,
            amount,
            currency,
            email,
            date: Date.now()
          }
        });
      } catch (err) {
        await transaction.rollback();
        res.status(500);
        next(err);
      }
    })();
  }
};
