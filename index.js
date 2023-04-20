require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let cors = require("cors");
const app = express();
const port = process.env.PORT || 3006;
app.use(cors());
// app.use(cors({ credentials: true, origin: process.env.SERVICE_CLIENT }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

var mqttHandler = require("./app/routes/mqtt_handler");
var mqttClient = new mqttHandler();

let topicBattray = "mytopic/battray";
let topicLocation = "mytopic/location";

mqttClient.dataBattray(topicBattray);
mqttClient.dataLocation(topicLocation);

const mopartners = require("./app/routes/mopartners");
const kits = require("./app/routes/kits");

app.get("/", (req, res) => {
  res.json([
    {
      message: "Welcome to api mosfitech",
    },
  ]);
});
app.put("/kits/publish/", (req, res) => {
  mqttClient.rental({
    uuid: req.body.uuid,
    rental_status: req.body.rental_status,
  });
});

app.use("/mopartner", mopartners);
app.use("/kits", kits);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
