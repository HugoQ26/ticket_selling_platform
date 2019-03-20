// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  date: { type: Date, default: Date.now() },
  eventName: { type: String, required: true },
  userEmail: { type: String, required: true },
  ticketBought: { type: Number, required: true },
  cashCharged: { type: Number, required: true }
});

const Ticket = mongoose.model("ticket", ticketSchema);

module.exports = Ticket;
