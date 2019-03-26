const Events = require("../database/eventsDb");
const Tickets = require("../database/ticketsDb");
const Payment = require("./payment");
const debug = require("debug")("events:eventsCtrl");
const { validationResult } = require("express-validator/check");

module.exports = class EventsCtrl {
  static getAllEvents(req, res, next) {
    (async () => {
      console.time("start");

      try {
        let limit = req.query.limit || "";
        const cursor = Events.getAllEvents(limit);
        let data = [];
        let count = 1;
        cursor.on("data", events => {
          data.push(events);
          console.log(events, count++);
        });
        cursor.on("close", () => {
          res.json(data);
          console.timeEnd("start");

          debug(
            "GetAllEvents OK - ",
            req.method,
            req.originalUrl,
            res.statusCode
          );
        });
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

  static getEventTickets(req, res, next) {
    const { id } = req.params;

    (async () => {
      try {
        const { ticketQty } = await Events.getTicketsQty(id);
        res.json(ticketQty);
        debug(
          "getEventTickets OK - ",
          req.method,
          req.originalUrl,
          res.statusCode
        );
      } catch (err) {
        res.status(500);
        next(err);
      }
    })();
  }

  static deleteOneEvent(req, res, next) {
    const { id } = req.params;

    (async () => {
      try {
        const event = await Events.delOneEvent(id);
        res.json({ message: "Event deleted", event });
      } catch (err) {
        res.status(500);
        next(err);
      }
    })();
  }

  static buyTickets(req, res, next) {
    const { amountInEuroCents, email, ticketsBought } = req.body;
    const eventId = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Validation Error", err: errors.array() });
    }

    (async () => {
      try {
        const { ticketQty } = await Events.getTicketsQty(eventId);

        if (ticketsBought <= ticketQty) {
          req.session.cart = {
            amountInEuroCents,
            email,
            eventId,
            ticketsBought
          };

          res
            .status(201)
            .json({ message: "Cart created", cart: req.session.cart });
          const save = req.session.save();

          debug(
            "buyTickets OK - ",
            req.method,
            req.originalUrl,
            res.statusCode
          );
        } else {
          res.json({
            message: "Transaction failed",
            reason: "There is not enought tickets available",
            ticketsBought,
            ticketQty
          });
          debug(
            "buyTickets FAIL - ",
            req.method,
            req.originalUrl,
            res.statusCode
          );
        }
      } catch (err) {
        res.status(500);
        next(err);
      }
    })();
  }

  static charge(req, res, next) {
    token = req.body.stripeToken;

    const {
      amountInEuroCents,
      email,
      eventId,
      ticketsBought
    } = req.session.cart;

    (async () => {
      try {
        const { ticketQty } = await Events.getTicketsQty(eventId);

        if (ticketsBought <= ticketQty) {
          const { amount, currency } = await Payment.charge(
            amountInEuroCents,
            token
          );

          const updateTickets = await Events.incDecTickets(
            eventId,
            ticketsBought
          );

          const savePurchase = await Tickets.addTicket(
            Date.now(),
            eventId,
            email,
            ticketsBought,
            amountInEuroCents / 100
          );
          res.json({
            message: "Tickets purchuased sucessfully",
            purchase: {
              eventId,
              ticketsBought,
              amount: amountInEuroCents / 100,
              email,
              date: Date.now()
            }
          });
          debug(
            "buyTickets OK - ",
            req.method,
            req.originalUrl,
            res.statusCode
          );
        } else {
          res.json({
            message: "Transaction failed",
            reason: "There is not enought tickets available",
            ticketsBought,
            ticketQty
          });
          debug(
            "buyTickets FAIL - ",
            req.method,
            req.originalUrl,
            res.statusCode
          );
        }
      } catch (err) {
        res.status(500);
        next(err);
      }
    })();
  }
};
