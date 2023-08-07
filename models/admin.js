const { default: mongoose } = require("mongoose");

const Admin = mongoose.model("admins", {
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = Admin;
