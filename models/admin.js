const { default: mongoose } = require("mongoose");

const Admin = mongoose.model("admins", {
  mail: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = Admin;
