const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const PartnerSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  business_name: {
    type: String,
    required: true,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  owner_username: {
    type: String,
    required: true,
    max: 255,
  },
  latitude_shelter: {
    type: String,
    require: true,
  },
  longitude_shelter: {
    type: String,
    require: true,
  },
  radius_rental: {
    type: Number,
    require: true,
  },
  state_shelter: {
    type: String,
  },
  added_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("partner", PartnerSchema);
