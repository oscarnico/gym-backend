const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const paymentsSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  dateAssigned: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentsSchema);
