import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

// ✅ Connect to database immediately when function runs
await connectDB();

// ✅ Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",              // local frontend
    "https://lion-note-app.vercel.app"    // deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(ratelimiter);

// ✅ Routes
app.use("/api/notes", notesRoutes);

export default app;
