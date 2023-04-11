require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let cors = require("cors");
const app = express();
const port = process.env.PORT || 3005;
app.use(cors({ credentials: true, origin: process.env.SERVICE_CLIENT }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

var mqttHandler = require("./app/routes/mqtt_handler");
var mqttClient = new mqttHandler();

let topicBattray = "mytopic/battray";
let topicLocation = "mytopic/location"

mqttClient.connect();
mqttClient.dataBattray(topicBattray);
mqttClient.dataLocation(topicLocation);

const moPartner = require("./app/routes/mopartner");
const kits = require("./app/routes/kits");

app.get("/", (req, res) => {
  res.json([
    {
      message: "Welcome to api mosfitech",
    },
  ]);
});

// const verifyToken = require("../configs/verifyToken");
app.use("/mopartner", moPartner);
app.use("/kits", kits);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
