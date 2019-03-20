// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  ticketQty: { type: Number, required: true, min: 0 },
  ticketPrice: { type: Number, required: true }
});

const Event = mongoose.model("event", eventSchema);

module.exports = Event;
