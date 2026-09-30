import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import aiRoutes from './routes/aiRoutes';
import { errorHandler, notFoundHandler } from './middleware/error';
import { connectDB } from './db';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DeveloperDash API is running"
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

// Error Handling
app.use(notFoundHandler as any);
app.use(errorHandler as any);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
