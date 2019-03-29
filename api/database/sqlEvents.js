//const sqlDb = require("./sqlDb");
//const debug = require("debug")("events:eventsDb");
const EventModel = require("../model/eventSchema");
const Sequelize = require("sequelize");
const { gt, gte } = Sequelize.Op;

module.exports = class Events {
  static getAllEvents() {
    return new Promise((resolve, reject) => {
      EventModel.findAll({
        where: {
          ticketQty: {
            [gt]: 0
          }
        },
        order: [["date", "ASC"]]
      })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static getOneEvent(id) {
    return new Promise((resolve, reject) => {
      EventModel.findByPk(id)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static incDecTickets(id, ticketsBought, transaction) {
    return new Promise((resolve, reject) => {
      EventModel.decrement("ticketQty", {
        by: ticketsBought,
        where: {
          id,
          ticketQty: {
            [gte]: ticketsBought
          }
        },
        transaction
      })
        .then(result => {
          if (result[0][1]) {
            return resolve(result);
          }
          throw new Error("Not enought tickets or wrong event id");
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static addEvent(name, date, ticketQty, price) {
    return new Promise((resolve, reject) => {
      EventModel.create({
        name,
        ticketQty,
        price,
        date
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
