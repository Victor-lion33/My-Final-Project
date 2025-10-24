import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

//middleware
app.use(cors({
  origin: [
    "http://localhost:5173", // your frontend URL for development
    "lion-homes-7q9t7591u-victor-chukwunonyes-projects.vercel.app" // your deployed frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());//to parse JSON bodies
app.use(ratelimiter);

//custom middleware to log request method and url
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
//     next()
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(8000, () => {
        console.log("Server is running on PORT:", PORT);
    });
});
