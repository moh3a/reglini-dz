import mongoose from "mongoose";

const FinanceSchema = new mongoose.Schema({
  commission: Number,
});

const Finance =
  mongoose.models.Finance || mongoose.model("Finance", FinanceSchema);
export default Finance;
