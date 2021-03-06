const EventsModel = require("../model/eventSchema");
const debug = require("debug")("events:eventsDb");

module.exports = class Events {
  static getAllEvents(limit = "") {
    return new Promise((resolve, reject) => {
      EventsModel.find(
        { ticketQty: { $gt: 0 }, date: { $gt: Date.now() } },
        "name date ticketQty",
        { sort: { date: 1 }, limit: limit },
        (err, events) => {
          if (err) {
            return reject(err);
          }
          resolve(events);
        }
      );
    });
  }

  static getOneEvent(_id) {
    return new Promise((resolve, reject) => {
      EventsModel.findById({ _id }, (err, event) => {
        if (err) {
          return reject(err);
        }
        resolve(event);
      });
    });
  }

  static getTicketsQty(_id) {
    return new Promise((resolve, reject) => {
      EventsModel.findById({ _id }, "ticketQty", (err, qty) => {
        if (err) {
          return reject(err);
        }
        resolve(qty);
      });
    });
  }

  static delOneEvent(_id) {
    return new Promise((resolve, reject) => {
      EventsModel.findOneAndDelete({ _id }, (err, event) => {
        if (err) {
          return reject(err);
        }
        resolve(event);
      });
    });
  }

  static incDecTickets(_id, ticketsBought) {
    return new Promise((resolve, reject) => {
      EventsModel.findOneAndUpdate(
        { _id },
        { $inc: { ticketQty: -ticketsBought } },
        { new: true },
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  }

  static dateParse({ date }) {
    return new Promise((resolve, reject) => {
      if (typeof date.getMonth != "function") {
        return reject();
      }
      const dateParsed = {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString()
      };
      return resolve(dateParsed);
    });
  }

  static addEvent(name, date, ticketQty, ticketPrice) {
    return new Promise((resolve, reject) => {
      const event = new EventsModel({
        name,
        date,
        ticketQty,
        ticketPrice
      });

      event.save((err, event) => {
        if (err) {
          return reject(err);
        }
        resolve(event);
      });
    });
  }
};
