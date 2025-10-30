import Experience from "../models/Experience.js";

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ error: "Experience not found" });
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const { name, location, description, price, image, slots } = req.body;

    if (!name || !price || !slots) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newExperience = await Experience.create({
      name,
      location,
      description,
      price,
      image,
      slots
    });

    res.status(201).json({
      message: "Experience created successfully",
      experience: newExperience
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};