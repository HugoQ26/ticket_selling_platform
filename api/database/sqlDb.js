const Sequelize = require("sequelize");
// eslint-disable-next-line no-unused-vars
const env = require("dotenv").config();
const config = require("../../config");

const password = process.env.MYSQL_PASSWORD || config.mySqlPassword;
const user = process.env.MYSQL_USER || config.mySqlUser;
const host = process.env.MYSQL_HOST || config.mySqlHost;

const sequelize = new Sequelize("events", user, password, {
  host: host,
  dialect: "mysql"
});

module.exports = sequelize;
