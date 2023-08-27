const Payments = require("../models/payment");
const Customer = require("../models/customer");
const Service = require("../models/service");

const assingService = async (req, res) => {
  const { customerId, serviceId } = req.body;
  //   console.log("esto es el reqbody", req.body);

  try {
    const newPayment = new Payments({
      customerId,
      serviceId,
      dateAssigned: Date.now(),
    });

    // console.log(newPayment);

    await newPayment.save();

    // const customer = await Customer.findById(customerId);
    // const serviceObj = await Service.findById(serviceId);
    // if (customer) {
    //   console.log(`objeto de service: ${serviceObj}`);
    //   customer.services.push(serviceObj);
    //   console.log(`valor de customer: ${customer}`);
    //   await customer.save();
    // } else {
    //   throw new Error("cliente no encontrado");
    // }

    res.status(200).send("Servicio asignado correctamente");
  } catch (error) {
    console.error("Error intentando asignar", error);
    res.status(500).send("error en el servidor");
  }
};

// const getPayments = async (req, res) => {
//   try {
//     const payments = await Payments.find()
//       .populate("customerId")
//       .populate("serviceId")
//       .exec();

//     res.json(payments);
//   } catch (error) {
//     res.status(500).send("Error en el servidor");
//   }
// };

const getPayments = async (req, res) => {
  try {
    const payments = await Payments.find()
      .populate("customerId")
      .populate("serviceId")
      .exec();

    const processedData = {};

    payments.forEach((item) => {
      const clientId = item.customerId._id;

      if (!processedData[clientId]) {
        processedData[clientId] = {
          ...item.customerId.toObject(),
          services: [],
        };
      }

      processedData[clientId].services.push(item.serviceId);
    });

    const clientsWithServices = Object.values(processedData);

    res.json(clientsWithServices);
  } catch (error) {
    console.error("Error al obtener los pagos", error);
    res.status(500).send("Error en el servidor");
  }
};

const getPaymentById = async (req, res) => {
  const paymentId = req.params.id;

  try {
    const payment = await Payments.findById(paymentId)
      .populate("customerId")
      .populate("serviceId")
      .exec();

    if (!payment) {
      return res.status(404).send("Pago no encontrado");
    }

    res.json(payment);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
};

const deletePayment = async (req, res) => {
  const paymentId = req.params.id;

  try {
    const deletedPayment = await Payments.findByIdAndDelete(paymentId);

    if (!deletedPayment) {
      return res.status(404).send("Pago no encontrado");
    }

    res.json({ message: "Pago eliminado exitosamente" });
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
};

const getServicesByCustomerId = async (req, res) => {
  const customerId = req.params.id;

  try {
    const payments = await Payments.find({ customerId: customerId })
      .populate("serviceId")
      .exec();

    const services = [];
    payments.forEach((payment) => {
      payment.serviceId.forEach((service) => {
        services.push(service);
      });
    });

    res.json(services);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
};

const getPaymentByCustomerId = async (req, res) => {
  const customerId = req.params.id;

  try {
    const payments = await Payments.find({ customerId: customerId })
      .populate("serviceId")
      .exec();

    let totalPrice = 0;
    payments.forEach((payment) => {
      payment.serviceId.forEach((service) => {
        totalPrice += service.price;
      });
    });

    res.json({ totalAmount: totalPrice });
  } catch (error) {
    console.error("Error al obtener los pagos del cliente", error);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  assingService,
  getPayments,
  getPaymentByCustomerId,
  getServicesByCustomerId,
  getPaymentById,
  deletePayment,
};
