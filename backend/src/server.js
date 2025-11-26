import express from 'express';
import tasksRouter from './routes/tasksRouter.js';
import { connectDB } from './config/connectDB.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path, { dirname } from 'path'

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

const app = express();

// Middlewares
app.use(express.json());

if(process.env.NODE_ENV !== "production") {
  app.use(cors({origin: 'http://localhost:5173'}));
}

app.use("/api/tasks", tasksRouter);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
});
}

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
});
