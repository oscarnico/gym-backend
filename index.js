const express = require("express");
require('dotenv').config();
const { default: mongoose } = require("mongoose");
const app = express();
const port = 4000;
const cors = require("cors");
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MBD);

const admins = require("./routes/adminRoute");
const customers = require("./routes/customerRoute");
const services = require("./routes/serviceRoute");
const payments = require("./routes/paymentRouter");

app.use("/admin", admins);
app.use("/customer", customers);
app.use("/service", services);
app.use("/payment", payments);






app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

