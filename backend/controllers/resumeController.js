import pool from '../db/index.js';
import { analyzeResume } from '../services/analysisService.js';

export const uploadResume = async (req, res) => {
  const file_name = req.file?.originalname;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const analysis = await analyzeResume(req.file.buffer);
    const { ...data } = analysis;

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
      resume_rating,
      improvement_areas,
      upskill_suggestions,
      achievements
    } = data;

    const result = await pool.query(
      `INSERT INTO resumes (
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
        upskill_suggestions
      ) VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8,
        $9, $10, $11, $12,
        $13, $14, $15, $16, $17
      ) RETURNING *`,
      [
        file_name,
        name,
        email,
        phone,
        linkedin_url,
        portfolio_url,
        summary,
        JSON.stringify(work_experience || []),
        JSON.stringify(education || []),
        JSON.stringify(technical_skills || []),
        JSON.stringify(soft_skills || []),
        JSON.stringify(projects || []),
        JSON.stringify(certifications || []),
        JSON.stringify(achievements || []),
        resume_rating ?? null,
        improvement_areas ?? null,
        JSON.stringify(upskill_suggestions || [])
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error('Error uploading resume:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getAllResumes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM resumes ORDER BY uploaded_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching resumes:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM resumes WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching resume:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
