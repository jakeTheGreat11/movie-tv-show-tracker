import express from 'express';
import authRoutes from './routes/authRoute.js';
import movieRoutes from './routes/movieRoutes.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", movieRoutes);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})