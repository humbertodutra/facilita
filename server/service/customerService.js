const { Customer, CustomerLocation } = require('../models'); //
const { sequelize } = require('../models');
const calcularDistancia = require('../calculating');

exports.getAllCustomers = async () => {
    const a =  await Customer.findAll({
        include: [{
            model: CustomerLocation,
            as: 'location' // Ensure this matches the alias used in the association
        }]
    });

    return a;
};

exports.getCustomerById = async (id) => {
    return await Customer.findByPk(id, {
        include: [{
            model: CustomerLocation,
            as: 'location' // Ensure this matches the alias used in the association
        }]
    });
};

exports.addCustomer = async (customerData) => {

    try {
        console.log(customerData)
        let customerDetails = {
            nome: customerData.nome,
            email: customerData.email,
            telefone: customerData.telefone
        };
        const addCustomer = await Customer.create(customerDetails);
        if (customerData.location && addCustomer) {
            await CustomerLocation.create({ ...customerData.location, customer_id: addCustomer.id });
        }

        return addCustomer;
    }



 catch (error) {
        console.error('Validation error:', error);
        throw error; // Rethrow the error or handle it as needed
    }

}

exports.updateCustomer = async (id, customerData) => {

    try {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return null;
        }
        const customerDetails = {
            nome: customerData.nome,
            email: customerData.email,
            telefone: customerData.telefone
        };
        await customer.update(customerDetails);
        const customerLocation = await CustomerLocation.findOne({ where: { customer_id: id } });
        if (customerLocation) {
            await customerLocation.update(customerData.location);
        }
        return await Customer.findByPk(id, {"include": ["location"]});
    } catch (error) {
        console.error('Validation error:', error);
        throw error; // Rethrow the error or handle it as needed
    }

}
    
    

exports.deleteCustomer = async (id) => {

    const customerLocation = await CustomerLocation.findOne({ where: { customer_id: id } });
    if (customerLocation) {
        await customerLocation.destroy();
        return true;
    }

    const customer = await Customer.findByPk(id);
    if (customer) {
        await customer.destroy();
        return true;
    }

    return false;
};

exports.calculateRoute = async (pontos) => {
    console.log("hi")
    console.log(pontos);
    const rota = calcularDistancia(pontos); 
    console.log(rota);
   
    return rota;


}