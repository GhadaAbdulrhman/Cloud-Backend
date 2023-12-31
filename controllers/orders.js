const orderService = require('../services/orders');

module.exports.createOrder = async (req, res) => {
  const orderInfo = {
    user: req.body.userId, 
    products: req.body.products, 
    amount: req.body.amount,
    billingAddress: req.body.billingAddress,
  };

  try {
    const createdOrder = await orderService.createOrder(orderInfo);
    return res.status(201).send({
      msg: 'Order created successfully',
      orderId: createdOrder._id,
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// Add more order-related controllers as needed
