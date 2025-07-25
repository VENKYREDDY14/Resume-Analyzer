import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import ResumeAnalysisDetails from './ResumeAnalysisDetails';

const ResumeDetailsModal = ({ resume, onClose }) => {
  if (!resume) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-[#2584C6]">Resume Analysis</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <ResumeAnalysisDetails resume={resume} />
      </div>
    </div>
  );
};

const PastResumesTable = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/resumes`);
        if (res.status === 200) {
          setResumes(res.data);
        } else {
          toast.error(`Unexpected response [${res.status}] while fetching resumes.`);
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
    fetchResumes();
  }, []);

  const handleViewDetails = async (id) => {
    setLoadingId(id);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/resumes/${id}`);
      if (res.status === 200) {
        setSelectedResume(res.data);
      } else {
        toast.error(`Unexpected response [${res.status}] while fetching resume details.`);
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
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-5xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-[#2584C6]">Uploaded Resumes</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#2584C6" />
        </div>
      ) : resumes.length === 0 ? (
        <p className="text-[#2584C6]">No resumes uploaded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left text-gray-900 whitespace-nowrap">File Name</th>
                <th className="p-2 text-left text-gray-900 whitespace-nowrap">Uploaded On</th>
                <th className="p-2 text-left text-gray-900 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume) => (
                <tr key={resume.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 text-gray-600 whitespace-nowrap">{resume.file_name}</td>
                  <td className="p-2 text-gray-600 whitespace-nowrap">
                    {new Date(resume.uploaded_at).toLocaleString()}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <button
                      onClick={() => handleViewDetails(resume.id)}
                      className="bg-[#2584C6] text-white px-3 py-1 rounded hover:bg-blue-600 text-sm flex items-center justify-center w-[90px]"
                      disabled={loadingId === resume.id}
                    >
                      {loadingId === resume.id ? (
                        <ClipLoader size={16} color="#fff" />
                      ) : (
                        'Details'
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedResume && (
        <ResumeDetailsModal
          resume={selectedResume}
          onClose={() => setSelectedResume(null)}
        />
      )}
    </div>
  );
};

export default PastResumesTable;
