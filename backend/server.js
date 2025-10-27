import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./src/routes/notesRoutes.js";
import { connectDB } from "./src/config/db.js";
import ratelimiter from "./src/middleware/rateLimiter.js";


dotenv.config();

const app = express();

// ✅ Connect to database immediately when function runs
await connectDB();

// ✅ Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://lion-note.vercel.app"    // deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(ratelimiter);

// ✅ Routes
app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;
