import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: String,
  time: String,
  capacity: { type: Number, default: 10 },
  booked: { type: Number, default: 0 }
});

const experienceSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  price: Number,
  image: String,
  slots: [slotSchema]
});

export default mongoose.model("Experience", experienceSchema);
