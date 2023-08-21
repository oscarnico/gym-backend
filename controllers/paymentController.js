const Payments = require("../models/payment");

const assingService = async (req, res) => {
    const { customerId, serviceId } = req.body;
    try {
        const newPayment = new Payments ({ customerId, serviceId, dateAssigned: Date.now()  });
        await newPayment.save();

        res.status(200).send("servicio asignado correctamente");

    }catch (error) {
        console.error("Error intentando asignar", error);
        res.status(500).send("error en el servidor");
    }
};

const getPayments = async (req, res) => {
    const payment = await Payments.find();
    res.json(payment);
};

module.exports = { assingService, getPayments };