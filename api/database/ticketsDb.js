const TicketModel = require("../model/ticketsSchema");

module.exports = class Tickets {
  static addTicket(date, eventName, userEmail, ticketBought, cashCharged) {
    return new Promise((resolve, reject) => {
      const ticket = new TicketModel({
        date,
        eventName,
        userEmail,
        ticketBought,
        cashCharged
      });

      ticket.save(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
};
