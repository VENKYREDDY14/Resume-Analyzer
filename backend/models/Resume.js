import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

const Resume = sequelize.define('Resume', {
  file_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  uploaded_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  linkedin_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  portfolio_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  work_experience: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  education: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  technical_skills: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  soft_skills: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  projects: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  certifications: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  achievements: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  resume_rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  improvement_areas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  upskill_suggestions: {
    type: DataTypes.JSONB,
    allowNull: true,
  }
}, {
  tableName: 'resumes',
  timestamps: false,
});

export default Resume;
