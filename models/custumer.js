const { default: mongoose } = require("mongoose");

const Custumer = mongoose.model("custumers", {
    name: String,
    surname: String,
    dni: String,
    email: String
});

module.exports = Custumer;