const TicketModel = require("../model/ticketsSchema");

module.exports = class Tickets {
  static addTicket(
    date,
    eventId,
    userEmail,
    ticketBought,
    cashCharged,
    transaction
  ) {
    return new Promise((resolve, reject) => {
      TicketModel.create(
        {
          date,
          eventId,
          userEmail,
          ticketBought,
          cashCharged
        },
        { transaction }
      )
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
