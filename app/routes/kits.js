const express = require("express");
const router = express.Router();
const KitsModel = require("../models/KitsModel");
var mqttHandler = require("./mqtt_handler");
var mqttClient = new mqttHandler();

router.post("/", async (req, res) => {
  const dataKits = new KitsModel({
    _id: req.body._id,
    owner_email: req.body.owner_email,
    category: req.body.category,
    type: req.body.type,
    rental_status: req.body.rental_status,
    warning_status: req.body.warning_status,
    battray: req.body.battray,
    rental_time: req.body.rental_time,
    price: req.body.price,
    latitude_kit: req.body.latitude_kit,
    longitude_kit: req.body.longitude_kit,
    latest_rent_username: req.body.latest_rent_username,
    latest_rent_email: req.body.latest_rent_email,
  });

  try {
    const dataKitsPost = await dataKits.save();
    res.json({
      status: 200,
      message: "success add new kits",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const dataKitsGet = await KitsModel.find();
    res.json(dataKitsGet);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const dataKitsUpdate = await KitsModel.updateOne(
      { _id: req.params.id },
      {
        owner_email: req.body.owner_email,
        category: req.body.category,
        type: req.body.type,
        rental_status: req.body.rental_status,
        warning_status: req.body.warning_status,
        battray: req.body.battray,
        rental_time: req.body.rental_time,
        price: req.body.price,
        latitude_kit: req.body.latitude_kit,
        longitude_kit: req.body.longitude_kit,
        latest_rent_username: req.body.latest_rent_username,
        latest_rent_email: req.body.latest_rent_email,
      }
    );
    res.json({
      status: 200,
      message: dataKitsUpdate,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const dataKitsDelete = await KitsModel.deleteOne({
      _id: req.params.id,
    });
    res.json({
      status: 200,
      message: dataKitsDelete,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const dataKitsDetail = await KitsModel.find({
      owner_email: req.params.email,
    });
    res.json(dataKitsDetail);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
// mqtt
// warning status
router.put("/warning/:id", async (req, res) => {
  try {
    const dataKitsUpdate = await KitsModel.updateOne(
      { _id: req.params.id },
      {
        warning_status: req.body.warning_status,
      }
    );
    res.json({
      status: 200,
      message: dataKitsUpdate,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
// location
router.put("/location/:id", async (req, res) => {
  try {
    const dataKitsUpdate = await KitsModel.updateOne(
      { _id: req.params.id },
      {
        latitude_kit: req.body.latitude_kit,
        longitude_kit: req.body.longitude_kit,
      }
    );
    res.json({
      status: 200,
      message: dataKitsUpdate,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// battray
router.put("/battray/:id", async (req, res) => {
  try {
    const dataKitsUpdate = await KitsModel.updateOne(
      { _id: req.params.id },
      {
        battray: req.body.battray,
      }
    );
    res.json({
      status: 200,
      message: dataKitsUpdate,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// rental
router.put("/rental/:id", async (req, res) => {
  try {
    const dataKitsUpdate = await KitsModel.updateOne(
      { _id: req.params.id },
      {
        rental_status: req.body.rental_status,
        rental_time: req.body.rental_time,
        latest_rent_username: req.body.latest_rent_username,
        latest_rent_email: req.body.latest_rent_email,
      }
    );
    res.json({
      status: 200,
      message: dataKitsUpdate,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
router.get("/rental/:id", async (req, res) => {
  try {
    const dataKitsDetail = await KitsModel.findById({
      _id: req.params.id,
    });
    res.json(dataKitsDetail);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

module.exports = router;
