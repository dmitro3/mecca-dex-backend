const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const {
  startTrade,
  quitTrade,
  getTradeHistory,
  startCron,
} = require("./controller/tradeController");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

require("dotenv").config();

const port = process.env.PORT;
const MongoURI = process.env.MONGOURI;

app.post("/startTrade", startTrade);
app.post("/quitTrade", quitTrade);
app.get("/getTradeHistory", getTradeHistory);

async function startApp() {
  await mongoose
    .connect(MongoURI)
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));

  await startCron();

  await app.listen(port, () => {
    console.log(`server listening at port: ${port} `);
  });
}

startApp();
