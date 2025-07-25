import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resumeRoutes.js';
import initDB from './db/index.js';

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/resumes', resumeRoutes);

const PORT = process.env.PORT || 5000;
initDB().then(() => {
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  });