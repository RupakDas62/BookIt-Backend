import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import promoRoutes from "./routes/promoRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://bookit-client-rupak-das-projects.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/promo", promoRoutes);

app.get("/", (req, res) => res.send("BookIt API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
