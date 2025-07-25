import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import ResumeAnalysisDetails from './ResumeAnalysisDetails';

const MAX_FILE_SIZE_MB =5;

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      return;
    }

    const isPdf = selectedFile.type === 'application/pdf';
    const isWithinLimit = selectedFile.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

    if (!isPdf) {
      toast.error('Only PDF files are allowed.');
      setFile(null);
      return;
    }

    if (!isWithinLimit) {
      toast.error(`File size should be less than ${MAX_FILE_SIZE_MB}MB.`);
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.warn('Please choose a valid resume file!');
      return;
    }

    setLoading(true);
    setResponse(null);

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('file_name', file.name);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/resumes/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        toast.success('Resume uploaded successfully!');
        setResponse(res.data);
      } else {
        toast.error(`Unexpected response [${res.status}]: ${res.statusText}`);
      }
    } catch (err) {
      if (err.response) {
        toast.error(`Server Error [${err.response.status}]: ${err.response.statusText}`);
      } else if (err.request) {
        toast.error('Client Error: No response received from server.');
      } else {
        toast.error(`Unexpected Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="bg-gray-300 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-[#2584C6]">Upload Resume</h2>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full"
            accept="application/pdf"
          />
          <button
            type="submit"
            className="bg-[#2584C6] text-white px-4 py-2 rounded hover:bg-cyan-600 flex items-center space-x-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading && <ClipLoader size={18} color="#fff" />}
            <span>{loading ? 'Uploading...' : 'Upload'}</span>
          </button>
        </div>
      </div>

      {response && (
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-xl font-bold text-[#2584C6] mb-4">Resume Analysis</h3>
          <ResumeAnalysisDetails resume={response} />
        </div>
      )}
    </form>
  );
};

export default ResumeUploader;
