import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";

export const createBooking = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, experienceId, slot, quantity = 1 } = req.body;

    const exp = await Experience.findById(experienceId);
    if (!exp) return res.status(404).json({ error: "Experience not found" });

    const foundSlot = exp.slots.find(
      (s) => s.date === slot.date && s.time === slot.time
    );
    if (!foundSlot) return res.status(400).json({ error: "Invalid slot" });

    // Check if enough seats are available
    if (foundSlot.booked + quantity > foundSlot.capacity)
      return res.status(400).json({ error: "Not enough availability for this slot" });

    // Update booked count
    foundSlot.booked += quantity;
    await exp.save();

    const pricePerPerson = exp.price;
    const totalPrice = pricePerPerson * quantity;

    const booking = await Booking.create({
      user: { name, email },
      experienceId,
      slot,
      quantity,
      pricePerPerson,
      totalPrice,
      status: "confirmed",
    });

    res.status(201).json({ message: "Booking confirmed", booking });
  } catch (err) {
    console.error("Booking creation failed:", err);
    res.status(500).json({ error: err.message });
  }
};

