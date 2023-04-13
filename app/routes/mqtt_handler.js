const mqtt = require("mqtt");
const axios = require("axios");
const redis = require("redis");
const { location } = require("georedis");
const { reset } = require("nodemon");

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

const geo = require("georedis").initialize(client);
const rental = geo.addSet("rental");

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = "mqtt://test.mosquitto.org";
  }

  dataBattray(topic) {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host);

    // Mqtt error calback
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on("connect", () => {
      console.log(`mqtt battray connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe(topic, { qos: 0 });

    // When a message arrives, console.log it
    this.mqttClient.on("message", async (topic, message) => {
      let data = message.toString();
      const update_data = await axios
        .put(`http://localhost:3005/kits/12312412312/`, {
          battray: data,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`);
    });
  }

  dataLocation(topic) {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host);

    // Mqtt error calback
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on("connect", () => {
      console.log(`mqtt locations connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe(topic, { qos: 2 });

    // When a message arrives, console.log it
    this.mqttClient.on("message", async (topic, message) => {
      let data = message.toString();
      let dataArray = data.split(",");
      let latitude = dataArray[0];
      let longitude = dataArray[1];
      const update_data = await axios
        .put(`http://localhost:3006/kits/12312412312/`, {
          latitude_kit: latitude,
          longitude_kit: longitude,
        })
        .then((result) => {
          // set location shealter partner -5.3582643,105.3066098
          // const locationSetDisaster = {
          //   Disaster1: {
          //     latitude: latitude,
          //     longitude: longitude,
          //   },
          // };
          rental.addLocation(
            "Rental1",
            { latitude: -5.3582643, longitude: 105.3066098 },
            function (err, reply) {
              if (err) console.error(err);
              else console.log("added locations:", reply);
            }
          );

          // init
          const options = {
            withCoordinates: true, // Will provide coordinates with locations, default false
            withHashes: true, // Will provide a 52bit Geohash Integer, default false
            withDistances: true, // Will provide distance from query, default false
            order: "ASC", // or 'DESC' or true (same as 'ASC'), default false
            units: "m", // or 'km', 'mi', 'ft', default 'm'
            count: 100, // Number of results to return, default undefined
            accurate: true, // Useful if in emulated mode and accuracy is important, default false
          };

          // look for all points within ~5000m.
          rental.nearby(
            { latitude: latitude, longitude: longitude },
            1000,
            options,
            function (err, locations) {
              if (err) console.error(err);
              else {
                if (locations.length === 0) {
                  console.log(" warning, keluar zona penyewaan");
                  const warningUpdate = axios
                    .put(`http://localhost:3006/kits/12312412312/`, {
                      warning: 1,
                    })
                    .then((result) => {
                      console.log(result.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  const warningUpdate = axios
                    .put(`http://localhost:3006/kits/12312412312/`, {
                      warning: 0,
                    })
                    .then((result) => {
                      console.log(result.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  console.log("masih didalam radius penyewaan");
                }
              }
            }
          );
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  rental({ rental_status }) {
    // console.log(id_kit)
    const data = {
      rental_status: rental_status,
    };
    this.mqttClient.publish("rental/12312412312", JSON.stringify(data));
  }
}

module.exports = MqttHandler;
