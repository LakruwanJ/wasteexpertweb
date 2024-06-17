import React from 'react';

const TopNavigation = ({ toggleSidebar, openProfile }) => {
  return (
    <header className="bg-teal-600 shadow px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
      {/* Links */}
      <nav className="flex-1 mb-2 md:mb-0 md:text-right flex items-center justify-center md:justify-end">
        <button
          onClick={openProfile}
          className="block text-white md:inline-block md:mr-4 hover:text-teal-400"
        >
          Profile
        </button>
      </nav>
      
      {/* Example Button */}
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
        Logout
      </button>
    </header>
  );
};

export default TopNavigation;
