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
    this.mqttClient.subscribe(topic, { qos: 2 });

    // When a message arrives, console.log it
    this.mqttClient.on("message", async (topic, message) => {
      let data = message.toString();
      let dataArray = data.split(",");
      let uuid = dataArray[0];
      let battray = dataArray[1];
      const update_data = await axios
        .put(`http://localhost:3006/kits/battray/${uuid}`, {
          battray: battray,
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
      let uuid = dataArray[0];
      let latitude = dataArray[1];
      let longitude = dataArray[2];
      // console.log(latitude, longitude);
      let owner_email = "";
      let radius_rental = 0;
      console.log(uuid.toString());
      const get_owner_email = await axios
        .get(`http://localhost:3006/kits/rental/${uuid}`)
        .then((result) => {
          owner_email = result.data.owner_email;
          console.log(owner_email);
        })
        .catch((err) => {
          console.log(err);
        });
      const get_owner_data = await axios
        .get(`http://localhost:3006/mopartner/info/${owner_email}`)
        .then((result) => {
          rental.addLocation(
            `${result.data[0].business_name}`,
            {
              latitude: `${parseFloat(result.data[0].latitude_shelter)}`,
              longitude: `${parseFloat(result.data[0].longitude_shelter)}`,
            },
            function (err, reply) {
              if (err) console.error(err);
              else {
                radius_rental = parseFloat(result.data[0].radius_rental);
                console.log("added locations:", reply);
              }
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
      const update_data = await axios
        .put(`http://localhost:3006/kits/location/${uuid}`, {
          latitude_kit: latitude,
          longitude_kit: longitude,
        })
        .then((result) => {
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
            radius_rental,
            options,
            function (err, locations) {
              if (err) console.error(err);
              else {
                if (locations.length === 0) {
                  console.log(" warning, keluar zona penyewaan");
                  const warningUpdate = axios
                    .put(`http://localhost:3006/kits/warning/${uuid}/`, {
                      warning_status: 1,
                    })
                    .then((result) => {
                      console.log("done", result.data);
                      const warningPub = axios.put(
                        `http://localhost:3006/kits/publish/warning/`,
                        {
                          uuid: uuid,
                          warning_status: 1,
                        }
                      );
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  const warningUpdate = axios
                    .put(`http://localhost:3006/kits/warning/${uuid}/`, {
                      warning_status: 0,
                    })
                    .then((result) => {
                      console.log(result.data);
                      const warningPub = axios.put(
                        `http://localhost:3006/kits/publish/warning/`,
                        {
                          uuid: uuid,
                          warning_status: 0,
                        }
                      );
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
  rental({ uuid, rental_status, warning_status }) {
    // console.log(id_kit)
    // const data = {
    //   rental_status: rental_status,
    //   warning_status: warning_status,
    // };
    this.mqttClient.publish(`rental/${uuid}`, JSON.stringify(rental_status));
  }

  warning({ uuid, warning_status }) {
    // console.log(id_kit)
    // const data = {
    //   rental_status: rental_status,
    //   warning_status: warning_status,
    // };
    // console.log("warning nih", warning_status);
    this.mqttClient.publish(
      `rental/warning/${uuid}`,
      JSON.stringify(warning_status)
    );
  }
}

module.exports = MqttHandler;
