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
      className={`block px-4 py-2 ${
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
    <nav className="fixed top-0 w-full z-50 bg-[#2584C6] h-[70px] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Resume Analyzer</h1>
          <div className="hidden md:flex space-x-4">
            {navItems.map(renderNavLink)}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleMenu}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#2584C6] text-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden shadow-lg`}
      >
        <div className="flex justify-between  items-center ">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={toggleMenu}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-2">
          {navItems.map(renderNavLink)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
