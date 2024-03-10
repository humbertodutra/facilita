const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");
const customerController = require('../controllers/customersController');

// User Routes

router.post('/users/verifyToken', userController.verifyToken);
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);

router.use(authMiddleware.verifyToken);

// Customer Routes

router.get('/customers', customerController.getCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.post('/customers/add', customerController.addCustomer);
router.put('/customers/:id', customerController.updateCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);


router.post("/customers/calculaterouter", customerController.calculateRoute)

module.exports = router;
