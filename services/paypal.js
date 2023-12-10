const paypal = require('paypal-rest-sdk');
const { PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY } = process.env;

paypal.configure({
  mode: 'sandbox', 
  client_id: "AauqIm2dTtOf3QnueI1hj-cf1KVXsmf0oS9WGyvikcIRn89P5xxUYVC-Ckt___lsumO7yNqqZv-l07tR",
  client_secret: "EK6uqTKhCVrNs0iJsLGTB1bB0NddGaE1GDTFPWrp-ed45yYQuTE06hR3dCt-71GhTTaTVyUyON1Im8gH",
});

module.exports.createPayment = (amount, description) => {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://192.168.242.171:5000/clothingstore', 
      cancel_url: 'http://192.168.242.171:5000/clothingstore', 
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: description,
              sku: 'item',
              price: amount,
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: amount,
        },
        description: description,
      },
    ],
  };

  return new Promise((resolve, reject) => {
    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        resolve(payment.links.find((link) => link.rel === 'approval_url').href);
      }
    });
  });
};

module.exports.executePayment = (paymentId, payerId) => {
  const execute_payment_json = {
    payer_id: payerId,
  };

  return new Promise((resolve, reject) => {
    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
};
