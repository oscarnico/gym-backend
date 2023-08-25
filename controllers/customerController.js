const Customer = require("../models/customer");

const addtCustomer = async (req, res) => {
  const { name, surname, dni, email } = req.body;
  const newCustomer = new Customer({
    name,
    surname,
    dni,
    email,
  });
  await newCustomer.save();
  res.json({ message: "creado nuevo customer" });
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).send("Error al traer los clientes");
  }
};

const getCustomersById = async (req, res) => {
  const { customerId } = req.params;
  const customer = await Customer.findById(customerId);
  res.json(customer);
};

const editCustomerById = async (req, res) => {
  const { customerId } = req.params;
  const { name, surname, dni, email } = req.body;

  try {
    const editedCustomer = await Customer.findOneAndUpdate(
      { _id: customerId },
      { $set: { name, surname, dni, email } },
      { new: true, useFindAndModify: false }
    );

    if (editedCustomer) {
      res.json(editedCustomer);
    } else {
      res.status(404).json({
        message: "No se encontró el cliente con el ID proporcionado.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el cliente.",
      error: error.message,
    });
  }
};

const deleCustomersById = async (req, res) => {
  const { customerId } = req.params;
  await Customer.deleteOne({ _id: customerId });
  res.json();
};

module.exports = {
  getCustomersById,
  getCustomers,
  editCustomerById,
  deleCustomersById,
  addtCustomer,
};
