const Events = require("../database/eventsDb");
const Tickets = require("../database/ticketsDb");
const Payment = require("./payment");
const debug = require("debug")("events:eventsCtrl");

module.exports = class EventsCtrl {
  static getAllEvents(req, res) {
    (async () => {
      try {
        let limit = req.query.limit || "";
        const events = await Events.getAllEvents(limit);
        res.json(events);
        debug(
          "GetAllEvents OK - ",
          req.method,
          req.originalUrl,
          res.statusCode
        );
      } catch (err) {
        res.status(404);
        res.json({ message: "Error", err });

        debug(
          "GetAllEvents ERROR - ",
          req.method,
          req.originalUrl,
          res.statusCode
        );
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
        res.status(404);
        res.json({ message: "Error", err });

        debug(
          "GetOneEvent ERROR - ",
          req.method,
          req.originalUrl,
          res.statusCode
        );
      }
    })();
  }

  static addEvent(req, res, next) {
    const { name, date, ticketQty, ticketPrice } = req.body;
    // TODO validate req.body
    (async () => {
      try {
        const event = await Events.addEvent(name, date, ticketQty, ticketPrice);
        res.json({ message: "Event added", event });
      } catch (err) {
        res.status(404);
        res.json({ message: "Error", err });

        debug("addEvent ERROR - ", req.method, req.originalUrl, res.statusCode);
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
        res.status(404);
        res.json({ message: "Error", err });

        debug(
          "getEventTickets ERROR - ",
          req.method,
          req.originalUrl,
          res.statusCode
        );
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
        res.status(404);
        res.json({ message: "Error", err });

        debug(
          "deleteOneEvent ERROR - ",
          req.method,
          req.originalUrl,
          res.statusCode
        );
      }
    })();
  }

  static buyTickets(req, res, next) {
    token = request.body.stripeToken;

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
        res.status(404);
        res.json({ message: "Error", err });

        debug(
          "buyTickets ERROR - ",
          req.method,
          req.originalUrl,
          res.statusCode
        );
      }
    })();
  }
};
