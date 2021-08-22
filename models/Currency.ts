const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  exchange: String,
  historical: [
    {
      time: Number,
      official: {
        sale: Number,
      },
      parallel: {
        sale: Number,
        purchase: Number,
      },
    },
    {
      timestamps: true,
    },
  ],
});

const Currency =
  mongoose.models.Currency || mongoose.model("Currency", currencySchema);
export default Currency;
