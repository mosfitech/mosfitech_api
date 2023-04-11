const mqtt = require("mqtt");
const axios = require("axios");

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = "mqtt://test.mosquitto.org";
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host);

    // Mqtt error calback
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on("connect", () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe("mytopic/id_kit", { qos: 0 });

    // When a message arrives, console.log it
    this.mqttClient.on("message", function (topic, message) {
      console.log(message.toString());
    });

    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`);
    });
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
      console.log(`mqtt latitude connected`);
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
        .put(`http://localhost:3005/kits/12312412312/`, {
          latitude_kit: latitude,
          longitude_kit: longitude,
        })
        .then((result) => {
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
  sendMessage({
    id_kit,
    category,
    type,
    state_kit,
    battray,
    rental_time,
    latitude_kit,
    longitude_kit,
    latets_rent_username,
    latest_rent_email,
    updated_at,
  }) {
    // console.log(id_kit)
    const data = {
      id_kit: id_kit,
      category: category,
      type: type,
      state_kit: state_kit,
      battray: battray,
      rental_time: rental_time,
      latitude_kit: latitude_kit,
      longitude_kit: longitude_kit,
      latets_rent_username: latets_rent_username,
      latest_rent_email: latest_rent_email,
      added_at: Date.now(),
      updated_at: updated_at,
    };
    this.mqttClient.publish("mytopic", JSON.stringify(data));
  }
}

module.exports = MqttHandler;
