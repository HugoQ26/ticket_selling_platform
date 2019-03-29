const Sequelize = require("sequelize");
const sequelize = require("../database/sqlDb");

const Event = sequelize.define("event", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ticketQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 0 }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 0 }
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Event;
