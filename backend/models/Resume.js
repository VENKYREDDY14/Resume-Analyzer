import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    file_name: {
      type: String,
      required: true,
    },

    name: String,

    email: {
      type: String,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
      index: true,
    },

    phone: String,

    linkedin_url: String,
    portfolio_url: String,

    summary: String,

    work_experience: [
      {
        company: String,
        role: String,
        start_date: Date,
        end_date: Date,
        description: [String],
      },
    ],

    education: [
      {
        institution: String,
        degree: String,
        year: String,
      },
    ],

    technical_skills: [String],
    soft_skills: [String],

    projects: [
      {
        name: String,
        description: String,
        tech_stack: [String],
      },
    ],

    certifications: [String],
    achievements: [String],

    resume_rating: {
      type: Number,
      min: 0,
      max: 100,
    },

    improvement_areas: String,

    upskill_suggestions: [String],
  },
  {
    collection: "resumes",
    timestamps: true,
  },
);

const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default Resume;
