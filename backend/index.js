import express from "express";
import authRoutes from "./routes/authRoute.js";
import movieRoutes from "./routes/movieRoutes.js";
import languageRoutes from "./routes/languageRoutes.js";
import tvShowRoutes from "./routes/tvShowRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import userRoutes from "./routes/userRoute.js";
import searchRoutes from "./routes/searchRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/tv-shows", tvShowRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api", languageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/search", searchRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
