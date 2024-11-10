import React, { useState } from 'react';
import { Home, FileText, CheckCircle, LogOut, Users, BookPlus, PenSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PlumberList from '../plist/PlumberList';
import LeakageReportList from '../home/LeakageReportList';
import ResourcesAd from './resourcesad';

const AdminDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('Water4Life Dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === 'Logout') {
      navigate('/'); 
    } else {
      setActiveCategory(category);
    }
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
        className={`bg-cyan-300 text-blue-900 font-bold h-screen p-4 transition-width duration-300 ${isSidebarExpanded ? 'w-64' : 'w-20'}`}
      >      
        <div className="flex items-center mb-8">
          <img
            src="./src/assets/images/hat.jpg" 
            alt="Water4Life Logo"
            className="w-10 h-10 rounded-full"
          />
          {isSidebarExpanded && (
            <span className="ml-3 text-lg font-bold text-blue-900">Water4Life</span>
          )}
        </div>
        <nav>
          <ul>
            <li
              className="flex items-center text-blue-900 p-2 cursor-pointer hover:bg-blue-400"
              onClick={() => handleCategoryClick('List of Plumbers')}
            >
              <Users className="mr-2" />
              {isSidebarExpanded && <span>List of Plumbers</span>}
            </li>
            <li
              className="flex items-center p-2 cursor-pointer hover:bg-blue-400"
              onClick={() => handleCategoryClick('Plumbers Work Done')}
            >
              <CheckCircle className="mr-2 text-blue-800" />
              {isSidebarExpanded && <span className="text-blue-900">Plumbers Work Done</span>}
            </li>
            <li
              className="flex items-center p-2 cursor-pointer hover:bg-blue-400"
              onClick={() => handleCategoryClick('Leakage Report')}
            >
              <FileText className="mr-2 text-blue-800" />
              {isSidebarExpanded && <span className="text-blue-900">Leakage Report</span>}
            </li>
            <li
              className="flex items-center p-2 cursor-pointer hover:bg-blue-400"
              onClick={() => handleCategoryClick('Resources')}
            >
              <BookPlus className="mr-2 text-blue-800" />
              {isSidebarExpanded && <span className="text-blue-900">Resources</span>}
            </li>
            <li
              className="flex items-center p-2 cursor-pointer hover:bg-blue-400"
              onClick={() => handleCategoryClick('Events/Campaigns')}
            >
              <PenSquare className="mr-2 text-blue-800" />
              {isSidebarExpanded && <span className="text-blue-900">Events & Campaigns</span>}
            </li>
            <li
              className="flex items-center p-2 cursor-pointer hover:bg-blue-400"
              onClick={() => handleCategoryClick('plumbing materials(sales)')}
            >
              <PenSquare className="mr-2 text-blue-800" />
              {isSidebarExpanded && <span className="text-blue-900">Plumbing Materials</span>}
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
        {activeCategory === 'List of Plumbers' && <PlumberList/>}
        {activeCategory === 'Resources' && <ResourcesAd/>}
        {activeCategory === 'Plumbers Work Done' && (
          <div>Your completed plumber work reports will appear here.</div>
        )}
        {activeCategory === 'Leakage Report' && <LeakageReportList />}
      </main>
    </div>
  );
};

export default AdminDashboard;
