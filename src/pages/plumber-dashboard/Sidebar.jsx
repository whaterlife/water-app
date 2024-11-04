import React, { useState } from 'react';
import { Home, FileText, LogOut, Star } from 'lucide-react';

const Sidebar = ({ onCategorySelect, rating }) => {
  const [status, setStatus] = useState("Available");

  const toggleStatus = () => {
    setStatus((prev) => (prev === "Available" ? "Unavailable" : "Available"));
  };

  return (
    <aside className="w-64 bg-white text-orange-800 h-screen p-4">
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://via.placeholder.com/100" 
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <h2 className="text-lg font-semibold mt-2">Jacob Delanyo Dotsey</h2>
        <button 
          onClick={toggleStatus}
          className={`mt-2 px-3 py-1 rounded-lg text-white ${
            status === "Available" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {status}
        </button>
        <div className="flex items-center mt-2">
          {[...Array(rating)].map((_, index) => (
            <Star key={index} className="text-yellow-400" />
          ))}
        </div>
      </div>

      <nav>
        <ul>
          <li className="flex items-center p-2 cursor-pointer hover:bg-blue-200" onClick={() => onCategorySelect("Home")}>
            <Home className="mr-2" /> Home
          </li>
          <li className="flex items-center p-2 cursor-pointer hover:bg-blue-200" onClick={() => onCategorySelect("Checklist")}>
            <FileText className="mr-2" /> Checklist
          </li>
          <li className="flex items-center p-2 cursor-pointer hover:bg-blue-200" onClick={() => onCategorySelect("Logout")}>
            <LogOut className="mr-2" /> Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
