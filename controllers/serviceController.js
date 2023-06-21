const Service = require("../models/service");

const addService = async (req, res) => {
    const { description, price } = req.body;
    const service = new Service({
        description,
        service
    });
    await service.save();
    res.json(service);
};

const getService = async (req, res) => {
    const service = await Service.find();
    res.json(service);
};

const getServicesById  = async (req, res) => {
    const { serviceId } = req.params;
    const service = await Service.find(serviceId);
    res.json(service);
};

const deleteServiceById = async (req, res) => {
    const { serviceId } = req.params;
    await Service.deleteOne({_id: serviceId });
    res.json();
}

module.exports = {
    addService, getService,
    getServicesById, deleteServiceById
}