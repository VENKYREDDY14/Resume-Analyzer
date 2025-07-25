import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ResumeAnalysis from './pages/ResumeAnalysis';
import ResumeHistory from './pages/ResumeHIstory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 justify-text font-roboto">
      <ToastContainer position="top-right" autoClose={4000} />
      <Navbar />
      <main className="p-6 pt-20">
        <Routes>
          <Route path="/" element={<Navigate to="/upload" />} />
          <Route path="/upload" element={<ResumeAnalysis />} />
          <Route path="/history" element={<ResumeHistory />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
