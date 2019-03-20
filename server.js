/* eslint-disable no-console */
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// eslint-disable-next-line no-unused-vars
const env = require("dotenv").config();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();
const api = require("./api/routes/apiRoutes");

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const sessionStoreUri =
  process.env.SESION_STORE_URI || "mongodb://localhost:27017";
const sessionCollection = process.env.SESSION_STORE_COLLECTION || "Sessions";
const sessionSecret = process.env.SESSION_SECRET;

const store = new MongoDBStore({
  uri: sessionStoreUri,
  collection: sessionCollection
});

store.on("error", function(error) {
  console.log(error);
});

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: store,
    name: "sessionId"
  })
);
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

const PORT = process.env.PORT || 3000;

app.use("/api", api);
app.use((req, res)=>{
  res.status(404).send('Page not found 404');
})

const server = http.createServer(app);

mongoose
  .connect(mongodbUri, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongoDb");
    server.listen(PORT, () => {
      console.log(`Serveris running on port ${PORT}`);
    });
  })
  .catch(err => {
    throw Error(err);
  });

module.exports = server;
