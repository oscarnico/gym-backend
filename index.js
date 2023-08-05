const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 4000;
const cors = require("cors");
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://oscar:mongo747474@cluster0.xop9pmw.mongodb.net/GymOscar"
);

const admins = require("./routes/adminRoute");
const customers = require("./routes/customerRoute")
const services = require("./routes/serviceRoute")

app.use("/admin", admins);
app.use("/customer", customers);
app.use("/service", services)






app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

