const Events = require("../database/eventsDb");
const Tickets = require("../database/ticketsDb");
const Payment = require("./payment");

module.exports = class EventsCtrl {
  static getAllEvents(req, res) {
    (async () => {
      try {
        let limit = req.query.limit || "";
        const events = await Events.getAllEvents(limit);
        res.json(events);
      } catch (err) {
        res.send(err);
      }
    })();
  }

  static getOneEvent(req, res, next) {
    const { id } = req.params;

    (async () => {
      try {
        const event = await Events.getOneEvent(id);

        res.json(event);
      } catch (err) {
        res.send(err);
      }
    })();
  }

  static addEvent(req, res, next) {
    const { name, date, ticketQty, ticketPrice } = req.body;

    (async () => {
      try {
        const event = await Events.addEvent(name, date, ticketQty, ticketPrice);
        res.json({ message: "Event added", event });
      } catch (err) {
        res.send(err);
      }
    })();
  }

  static getEventTickets(req, res, next) {
    const { id } = req.params;

    (async () => {
      try {
        const { ticketQty } = await Events.getTicketsQty(id);
        res.json(ticketQty);
      } catch (err) {
        res.send(err);
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
        res.send(err);
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

    try {
      (async () => {
        const { ticketQty } = await Events.getTicketsQty(eventName);

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
        } else {
          res.json({
            message: "Transaction failed",
            reason: "There is not enought tickets available"
          });
        }
      })();
    } catch (error) {
      res.send(err);
    }
  }
};
