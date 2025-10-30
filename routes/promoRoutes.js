import express from "express";
import { validatePromo, createPromo  } from "../controllers/promoController.js";
const router = express.Router();

router.post("/validate", validatePromo);
router.post("/", createPromo);

export default router;
