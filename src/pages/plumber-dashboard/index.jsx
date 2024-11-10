import React, { useState } from 'react';
import { Home, FileText, CheckCircle, LogOut, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PlumberChecklistForm from '../plist/PlumbersCheckList';
import LeakageReportList from '../home/ReportleakageList';

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState('My Dashboard');
  const [rating, setRating] = useState(3);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === 'Logout') {
      navigate('/log'); 
    } else if (category === 'reportlist') {
      setActiveCategory(category);
    } else {
      setActiveCategory(category);
    }
  };

  const handleTaskCompletion = () => {
    setRating(prev => (prev < 5 ? prev + 1 : prev));
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev);
  };

  const handleMouseLeave = () => {
    setIsSidebarExpanded(false);
  };

  return (
    <div className="flex">
      <aside
        onMouseEnter={toggleSidebar}
        onMouseLeave={handleMouseLeave}
        className={`bg-white text-blue-800 h-screen p-4 transition-width duration-300 ${isSidebarExpanded ? 'w-64' : 'w-20'}`}
      >
        <div className="flex items-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          {isSidebarExpanded && (
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Jacob Delanyo Dotsey</h2>
              <div className="text-blue-700 flex items-center">
                {[...Array(rating)].map((_, index) => (
                  <Star key={index} className="text-cyan-400" />
                ))}
              </div>
            </div>
          )}
        </div>

        <nav>
          <ul>
            <li
              className="flex text-blue-900 items-center p-2 cursor-pointer hover:bg-blue-400"
              onClick={() => handleCategoryClick('ReportList')}
            >
              <Home className="mr-2" />
              {isSidebarExpanded && <span>ReportList</span>}
            </li>
            <li
              className="flex items-center p-2 cursor-pointer hover:bg-blue-400"
              onClick={() => handleCategoryClick('PlumberChecklist Form')}
            >
              <FileText className="mr-2 text-blue-800" />
              {isSidebarExpanded && <span className="text-blue-900">Plumber Checklist Form</span>}
            </li>
            <li
              className="flex items-center p-2 cursor-pointer hover:bg-blue-400"
              onClick={() => handleCategoryClick('Completed Task')}
            >
              <CheckCircle className="mr-2" />
              {isSidebarExpanded && <span>Completed Task</span>}
            </li>
            <li
              className="flex items-center p-2 cursor-pointer hover:bg-blue-400"
              onClick={() => handleCategoryClick('Logout')}
            >
              <LogOut className="mr-2" />
              {isSidebarExpanded && <span>Logout</span>}
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 bg-white p-6">
        <h1 className="text-2xl text-blue-800 font-semibold mb-4">{activeCategory}</h1>
        {activeCategory === 'ReportList' && <LeakageReportList />}
        {activeCategory === 'PlumberChecklist Form' && <PlumberChecklistForm />}
        {activeCategory === 'Completed Task' && (
          <div>
            <p>Your completed tasks will appear here.</p>
            <button
              onClick={handleTaskCompletion}
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              Mark Task as Completed
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
