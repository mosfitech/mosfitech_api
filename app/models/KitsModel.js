const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const KitsSchema = mongoose.Schema({
  _id: {
    type: String,
  },
  owner_email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    max: 255,
  },
  type: {
    type: String,
    required: true,
    max: 255,
  },
  state_kit: {
    type: Number,
    required: true,
  },
  battray: {
    type: Number,
    required: true,
  },
  rental_time: {
    type: Number,
    required: true,
  },
  latitude_kit: {
    type: String,
    require: true,
  },
  longitude_kit: {
    type: String,
    require: true,
  },
  latest_rent_username: {
    type: String,
    required: true,
    max: 255,
  },
  latest_rent_email: {
    type: String,
    required: true,
    max: 255,
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("kits", KitsSchema);
