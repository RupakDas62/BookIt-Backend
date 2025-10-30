import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
  },
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experience",
  },
  slot: {
    date: String,
    time: String,
  },
  totalPrice: Number,
  status: { type: String, default: "confirmed" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
