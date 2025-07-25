import express from 'express';
import upload from '../middleware/multer.js';

import {
  uploadResume,
  getAllResumes,
  getResumeById,
} from '../controllers/resumeController.js';

const router = express.Router();

router.post('/upload', upload.single('resume'), uploadResume);
router.get('/', getAllResumes);
router.get('/:id', getResumeById);

export default router;
