const Service = require("../models/service");

const addService = async (req, res) => {
    const { description, price } = req.body;
    const service = new Service({
        description,
        price,
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

const editServieById = async (req, res) => {
    const { serviceId } = req.params;
    const { description, price } = req.body;

    try {
        const editedService = await Service.findOneAndUpdate(
            {_id: serviceId},
            { $set: {description, price}},
            {new: true, useFindAndModify: false}
        );

        if (editedService) {
            res.json(editedService);
        } else {
            res.status(404).json({ message: "No se encontró el servicio con el ID proporcionado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el servicio.", error: error.message });
    }
};

const deleteServiceById = async (req, res) => {
    const { serviceId } = req.params;
    await Service.deleteOne({_id: serviceId });
    res.json();
}

module.exports = {
    addService, getService,
    editServieById,
    getServicesById, deleteServiceById
}