const express = require("express");
const router = express.Router();
const OksigenModel = require("../models/OksigenModel");
const PartnerModel = require("../models/PartnerModel");

router.post("/", async (req, res) => {
  const dataPartber = new PartnerModel({
    _id: req.body._id,
    business_name: req.body.business_name,
    email: req.body.email,
    owner_username: req.body.owner_username,
    latitude_shelter: req.body.latitude_shelter,
    longitude_shelter: req.body.longitude_shelter,
    radius_rental: req.body.radius_rental,
    kit_id: [req.body.kit_id],
    state_shelter: req.body.state_shelter,
  });

  try {
    const dataPartberPost = await dataPartber.save();
    res.json({
      status: 200,
      message: "success add partner",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const dataPartnerGet = await PartnerModel.find();
    res.json(dataPartnerGet);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const dataPartnerUpdate = await PartnerModel.updateOne(
      { _id: req.params.id },
      {
        business_name: req.body.business_name,
        email: req.body.email,
        owner_username: req.body.owner_username,
        latitude_shelter: req.body.latitude_shelter,
        longitude_shelter: req.body.longitude_shelter,
        radius_rental: req.body.radius_rental,
        kit_id: [req.body.kit_id],
        state_shelter: req.body.state_shelter,
      }
    );
    res.json({
      status: 200,
      message: dataPartnerUpdate,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const dataPartnerDelete = await PartnerModel.deleteOne({
      _id: req.params.id,
    });
    res.json({
      status: 200,
      message: dataPartnerDelete,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dataPartnerDetail = await PartnerModel.findById({
      _id: req.params.id,
    });
    res.json(dataPartnerDetail);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

module.exports = router;
