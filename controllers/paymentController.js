const Payments = require("../models/payment");
const Customer = require("../models/customer");
const Service = require("../models/service");
const transporter = require("../mailTicket");

const assingService = async (req, res) => {
  const { customerId, serviceId } = req.body;

  try {
    const newPayment = new Payments({
      customerId,
      serviceId,
      dateAssigned: Date.now(),
    });

    await newPayment.save();

    const customer = await Customer.findById(customerId);

    const mailTicket = {
      to: customer.email,
      subject: "Oscar´s Gym : Purchase Confirmation. ",
      text: " Class paid for, you can access with this super secret key: PwAwSwA !! ",
    };

    try {
      await transporter.sendMail(mailTicket);
    } catch (error) {
      console.log(error);
    }
    res.status(200).send("Servicio asignado correctamente");
  } catch (error) {
    console.error("Error intentando asignar", error);
    res.status(500).send("error en el servidor");
  }
};

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

      processedData[clientId].services.push({
        ...item.serviceId._doc,
        paymentId: item._id,
      });
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

const getTotalServices = async (req, res) => {
  try {
    const resultados = await Payments.aggregate([
      {
        $group: {
          _id: "$serviceId",
          total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "_id",
          as: "servicio",
        },
      },
      {
        $unwind: "$servicio",
      },
      {
        $project: {
          _id: 0,
          description: "$servicio.description",
          total: 1,
        },
      },
    ]);

    res.json(resultados);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteServiPay = async (req, res) => {
  const { paymentId } = req.params;
  console.log(paymentId);
  try {
    const paymentRecord = await Payments.findByIdAndDelete(paymentId);

    res.status(200).send("Servicio eliminado correctamente.");
  } catch (error) {
    console.error("Error intentando eliminar el pago", error);
    res.status(500).send("Error en el servidor.");
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
  getTotalServices,
  deleteServiPay,
};
