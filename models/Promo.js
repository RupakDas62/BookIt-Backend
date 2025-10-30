import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  code: String,
  discountType: { type: String, enum: ["flat", "percent"], default: "percent" },
  value: Number,
  active: { type: Boolean, default: true }
});

export default mongoose.model("Promo", promoSchema);
