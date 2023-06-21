const { default: mongoose } = require("mongoose");

const Service = mongoose.model("services", {
  description: String,
  price: Number,
});

module.exports = Service;
