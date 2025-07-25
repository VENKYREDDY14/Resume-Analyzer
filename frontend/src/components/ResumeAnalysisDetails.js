import React from 'react';

const ResumeAnalysisDetails = ({ resume }) => {
  if (!resume) return null;
  const renderLink = (label, url) => {
    if (!url) {
      return (
        <p className="text-gray-600">
          <strong>{label}:</strong> N/A
        </p>
      );
    }

    const fixedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

    return (
      <p className="text-gray-600">
        <strong>{label}:</strong>{' '}
        <a
          href={fixedUrl}
          className="text-blue-600 underline"
          target="_blank"
          rel="noreferrer"
        >
          {url}
        </a>
      </p>
    );
  };

  return (
    <div className="space-y-4 text-sm">
      <div>
        <h3 className="font-semibold text-[#2584C6]">Name</h3>
        <p className="text-gray-600">{resume.name || 'N/A'}</p>
      </div>
      <div>
        <h3 className="font-semibold text-[#2584C6]">Contact</h3>
        <p className="text-gray-600">Email: {resume.email || 'N/A'}</p>
        <p className="text-gray-600">Phone: {resume.phone || 'N/A'}</p>
        {renderLink('LinkedIn', resume.linkedin_url)}
        {renderLink('Portfolio', resume.portfolio_url)}
      </div>
      <div>
        <h3 className="font-semibold text-[#2584C6]">Summary</h3>
        <p className="text-gray-600">{resume.summary || 'N/A'}</p>
      </div>
      <div>
        <h3 className="font-semibold text-[#2584C6]">Work Experience</h3>
        {resume.work_experience?.length ? (
          resume.work_experience.map((exp, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-medium text-gray-700">
                {exp.role} at {exp.company} ({exp.duration})
              </p>
              <ul className="list-disc list-inside text-gray-600">
                {exp.description.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600">N/A</p>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-[#2584C6]">Education</h3>
        {resume.education?.length ? resume.education.map((edu, idx) => (
          <p key={idx} className="text-gray-600">
            {edu.degree}, {edu.institution} ({edu.graduation_year})
          </p>
        )) : <p className="text-gray-600">N/A</p>}
      </div>
      <div>
        <h3 className="font-semibold text-[#2584C6]">Technical Skills</h3>
        <p className="text-gray-600">{resume.technical_skills?.join(', ') || 'N/A'}</p>
      </div>
      <div>
        <h3 className="font-semibold text-[#2584C6]">Soft Skills</h3>
        <p className="text-gray-600">{resume.soft_skills?.join(', ') || 'N/A'}</p>
      </div>
      <div>
        <h3 className="font-semibold text-[#2584C6]">Projects</h3>
        {resume.projects?.length ? resume.projects.map((proj, i) => (
          <div key={i} className="mb-2">
            <p className="font-semibold text-gray-600">{proj.title}</p>
            <p className="text-gray-600">{proj.description}</p>
          </div>
        )) : <p className="text-gray-600">N/A</p>}
      </div>
      <div>
        <h3 className="font-semibold text-[#2584C6]">Achievements</h3>
        <ul className="list-disc list-inside text-gray-600">
          {resume.achievements?.length ? resume.achievements.map((item, i) => (
            <li key={i}>{item}</li>
          )) : <li>N/A</li>}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-[#2584C6]">Resume Rating</h3>
        <p className="text-gray-600">{resume.resume_rating || 'N/A'}/10</p>
      </div>
      <div>
        <h3 className="font-semibold text-[#2584C6]">Improvement Areas</h3>
        <p className="text-gray-600">{resume.improvement_areas || 'N/A'}</p>
      </div>
      <div>
        <h3 className="font-semibold text-[#2584C6]">Upskill Suggestions</h3>
        <ul className="list-disc list-inside text-gray-600">
          {resume.upskill_suggestions?.length ? resume.upskill_suggestions.map((skill, i) => (
            <li key={i}>{skill}</li>
          )) : <li>N/A</li>}
        </ul>
      </div>
    </div>
  );
};

export default ResumeAnalysisDetails;
