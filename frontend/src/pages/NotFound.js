import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-bold text-[#2584C6] mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">Oops! The page you're looking for does not exist.</p>
      <Link
        to="/"
        className="bg-[#2584C6] text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
