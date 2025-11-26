import express from 'express';
import tasksRouter from './routes/tasksRouter.js';
import { connectDB } from './config/connectDB.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'}));

app.use("/api/tasks", tasksRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
});
