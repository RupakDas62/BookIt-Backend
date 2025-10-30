import Promo from "../models/Promo.js";

export const validatePromo = async (req, res) => {
  try {
    const { code } = req.body;
    const promo = await Promo.findOne({ code, active: true });
    if (!promo) return res.status(400).json({ valid: false, message: "Invalid code" });
    res.json({ valid: true, promo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPromo = async (req, res) => {
  try {
    const { code, discountType, value, active } = req.body;

    if (!code || !value) {
      return res
        .status(400)
        .json({ error: "Code and value are required fields" });
    }

    const exists = await Promo.findOne({ code });
    if (exists) return res.status(400).json({ error: "Promo already exists" });

    const promo = await Promo.create({
      code,
      discountType: discountType || "percent",
      value,
      active: active !== false
    });

    res.status(201).json({ message: "Promo created successfully", promo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
