import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { to: '/upload', label: 'Resume Analysis' },
    { to: '/history', label: 'History' },
  ];

  const renderNavLink = ({ to, label }) => (
    <Link
      key={to}
      to={to}
      className={`px-4 py-2  ${
        pathname === to
          ? 'text-white font-semibold'
          : 'text-white/70 hover:text-white'
      }`}
      onClick={() => setIsOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#2584C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Resume Analyzer</h1>

          
          <div className="hidden md:flex space-x-4">
            {navItems.map(renderNavLink)}
          </div>

          
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 flex flex-col text-white">
          {navItems.map(renderNavLink)}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
