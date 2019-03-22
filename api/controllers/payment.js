module.exports = class PaymentGateway {
  static charge(amount, token, currency = "EUR") {
    return new Promise((resolve, reject) => {
      switch (token) {
        case "card_error":
          //return reject(new Error("Your card has been declined."));
          return reject("Your card has been declined.");
        case "payment_error":
          return reject("Something went wrong with your transaction.");
        default:
          resolve({ amount, currency });
      }
    });
  }
};
