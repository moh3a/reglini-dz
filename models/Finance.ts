const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema({
  commission: Number,
  acceptedPayments: [{ userId: mongoose.Mixed, orderId: mongoose.Mixed }],
  ordersMoneySumDinars: {
    type: Number,
    default: 0,
  },
  ordersMoneySumEuros: {
    type: Number,
    default: 0,
  },
});

const Finance =
  mongoose.models.Finance || mongoose.model("Finance", FinanceSchema);
export default Finance;
