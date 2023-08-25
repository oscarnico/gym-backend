const { default: mongoose } = require("mongoose");

const Service = mongoose.model("Service", {
  description: String,
  price: Number,
});

module.exports = Service;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const serviceSchema = new Schema({
//     description: String,
//     price: Number,
//     customer: { type: Schema.Types.ObjectId, ref: 'Customer' }
// });

// const Service = mongoose.model("services", serviceSchema);

// module.exports = Service;
