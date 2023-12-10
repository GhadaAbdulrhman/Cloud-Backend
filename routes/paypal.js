const { Router } = require('express');
const paypalController = require('../controllers/paypal');

const paypalRouter = Router();


paypalRouter.post('/pay', paypalController.initiatePayment);
paypalRouter.get('/callback', paypalController.handleCallback);

module.exports = paypalRouter;
