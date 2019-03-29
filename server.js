/* eslint-disable no-console */
const express = require("express");
const http = require("http");
const debug = require("debug")("events:server");
// eslint-disable-next-line no-unused-vars
const env = require("dotenv").config();
const app = express();
const sequelize = require("./api/database/sqlDb");

const api = require("./api/routes/apiRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use("/api", api);
app.use((req, res) => {
  res.status(404).json({ message: "Page not found 404" });
});

app.use((err, req, res, next) => {
  res.send({ message: "Error", err: err.message, errstack: err.stack });
});

debug("Aplication is booting");

const server = http.createServer(app);
sequelize
  .sync()
  .then(res => {
    debug("Connected to mySQLDb");
    server.listen(PORT, () => {
      debug(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });

module.exports = server;
