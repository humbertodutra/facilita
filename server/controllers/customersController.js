const customerService = require('../service/customerService');

getCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.json(customers);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getCustomerById = async (req, res) => {
    try {
        const customer = await customerService.getCustomerById(req.params.id);
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).send('Customer not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

addCustomer = async (req, res) => {
    try {
        const newCustomer = await customerService.addCustomer(req.body);
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await customerService.updateCustomer(req.params.id, req.body);
        if (updatedCustomer) {
            res.json(updatedCustomer);
        } else {
            res.status(404).send('Customer not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

deleteCustomer = async (req, res) => {
    try {
        const deleted = await customerService.deleteCustomer(req.params.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Customer not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

calculateRoute = async (req, res) => {
    try {
       
        const rota = await customerService.calculateRoute(req.body);
        res.json(rota);
    } catch (error) {
        res.status(500).send(error.message);    
    }
};


module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    calculateRoute
}