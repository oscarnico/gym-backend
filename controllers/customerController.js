const Customer = require("../models/customer");


const postCustomer = async (req, res) => {
    const { name, surname, dni, email } = req.body;
    const newCustomer = new Customer({
        name,
        surname,
        dni,
        email,
    });
    await newCustomer.save();
    res.json({message: "creado nuevo customer"})
}


const getCustomers = async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
};

const getCustomersById = async (req, res) => {
    const { customerId } = req.params;
    const customer = await Customer.findById(customerId);
    res.json(customer);
};

const deleCustomersById = async (req, res) => {
    const { customerId } = req.params;
    await Customer.deleteOne({_id: customerId});
    res.json();
};

module.exports = {
    getCustomers, getCustomersById,
    deleCustomersById, postCustomer
};