const paypalService = require('../services/paypal');

module.exports.initiatePayment = async (req, res) => {
  try {
    const { amount, description } = req.body;
    const paymentUrl = await paypalService.createPayment(amount, description);
    res.redirect(paymentUrl);
  } catch (error) {
    console.error('Error initiating PayPal payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.handleCallback = async (req, res) => {
  try {
    const { paymentId, PayerID } = req.query;
    const executedPayment = await paypalService.executePayment(paymentId, PayerID);
    // Handle successful payment
    res.redirect('http://192.168.242.171:5000/clothingstore'); // Redirect to success page
  } catch (error) {
    console.error('Error executing PayPal payment:', error);
    res.redirect('http://192.168.242.171:5000/clothingstore'); // Redirect to cancel page
  }
};
