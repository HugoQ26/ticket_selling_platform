const Sequelize = require("sequelize");
const sequelize = require("../database/sqlDb");

const Ticket = sequelize.define("tickets", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  eventId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userEmail: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ticketBought: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },
  cashCharged: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  }
});

module.exports = Ticket;
