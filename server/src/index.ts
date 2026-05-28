import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
dotenv.config();

connectDB();
const app = express();

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend url
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post",postRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
