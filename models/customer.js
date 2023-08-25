const { default: mongoose } = require("mongoose");

const Customer = mongoose.model("Customer", {
  name: String,
  surname: String,
  dni: String,
  email: String,
});

module.exports = Customer;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const customerSchema = new Schema({
//     name: String,
//     surname: String,
//     dni: String,
//     email: String,
//     services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
// });

// const Customer = mongoose.model("customers", customerSchema);

// module.exports = Customer;
