const Custumer = require("../models/custumer");

//añadir un addcustumer

const getCustumers = async (req, res) => {
    const custumers = await Custumer.find();
    res.json(custumers);
};

const getCustumersById = async (req, res) => {
    const { custumerId } = req.params;
    const custumer = await Custumer.findById(custumerId);
    res.json(custumer);
};

const deleCustumersById = async (req, res) => {
    const { custumerId } = req.params;
    await Custumer.deleteOne({_id: custumerId});
    res.json();
};

module.exports = {
    getCustumers, getCustumersById,
    deleCustumersById
};