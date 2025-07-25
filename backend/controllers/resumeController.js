import Resume from '../models/Resume.js';
import { analyzeResume } from '../services/analysisService.js';

export const uploadResume = async (req, res) => {
  const file_name = req.file?.originalname;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const analysis = await analyzeResume(req.file.buffer);

    const {
      name,
      email,
      phone,
      linkedin_url,
      portfolio_url,
      summary,
      work_experience,
      education,
      technical_skills,
      soft_skills,
      projects,
      certifications,
      achievements,
      resume_rating,
      improvement_areas,
      upskill_suggestions,
    } = analysis;

    const newResume = await Resume.create({
      file_name,
      name,
      email,
      phone,
      linkedin_url,
      portfolio_url,
      summary,
      work_experience,
      education,
      technical_skills,
      soft_skills,
      projects,
      certifications,
      achievements,
      resume_rating,
      improvement_areas,
      upskill_suggestions,
    });

    res.status(201).json(newResume);
  } catch (error) {
    console.error('Error uploading resume:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.findAll({
      order: [['uploaded_at', 'DESC']],
    });
    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findByPk(id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
