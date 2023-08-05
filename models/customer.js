const { default: mongoose } = require("mongoose");

const Customer = mongoose.model("customers", {
    name: String,
    surname: String,
    dni: String,
    email: String
});

module.exports = Customer;