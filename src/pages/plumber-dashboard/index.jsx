import React, { useState } from 'react';
import { Home, FileText, CheckCircle, LogOut, Star, Bell, Settings, Sun, Moon, HelpCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlumberChecklistForm from '../plist/PlumbersCheckList';
import LeakageReportList from '../home/LeakageReportList';

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState('My Dashboard');
  const [rating, setRating] = useState(3);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === 'Logout') {
      navigate('/log'); 
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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <div className={`flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-blue-800'}`}>
      <aside
        onMouseEnter={toggleSidebar}
        onMouseLeave={handleMouseLeave}
        className={`h-screen p-4 transition-width duration-300 flex flex-col ${isSidebarExpanded ? 'w-64' : 'w-20'} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >   
        {isSidebarExpanded && (
          <div className="mb-4 flex items-center">
            <Search className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 rounded bg-gray-200 text-blue-900"
            />
          </div>
        )}
        <div className="flex items-center mb-6">
          <img
            src="https://savefiles.org/secure/uploads/21338?shareable_link=491"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          {isSidebarExpanded && (
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Jacob Delanyo Dotsey</h2>
              <div className="flex items-center">
                {[...Array(rating)].map((_, index) => (
                  <Star key={index} className="text-cyan-400" />
                ))}
              </div>
            </div>
          )}
        </div>
        <nav className="flex-grow">
          <ul>
            {['Report List', 'Plumber Checklist Form', 'Completed Task'].map((item, index) => (
              <li
                key={index}
                className="flex items-center p-2 cursor-pointer hover:bg-blue-400"
                onClick={() => handleCategoryClick(item)}
                style={{ display: item.toLowerCase().includes(searchQuery.toLowerCase()) ? 'flex' : 'none' }}
              >
                {index === 0 ? <Home className="mr-2" /> : index === 1 ? <FileText className="mr-2 text-blue-800" /> : <CheckCircle className="mr-2" />}
                {isSidebarExpanded && <span>{item}</span>}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <ul>
            <li
              className="flex items-center p-2 cursor-pointer hover:bg-blue-400"
              onClick={() => handleCategoryClick('Help & Support')}
            >
              <HelpCircle className="mr-2" />
              {isSidebarExpanded && <span>Help & Support</span>}
            </li>
            <li
              className="flex items-center p-2 cursor-pointer hover:bg-blue-400"
              onClick={() => handleCategoryClick('Logout')}
            >
              <LogOut className="mr-2" />
              {isSidebarExpanded && <span>Logout</span>}
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">{activeCategory}</h1>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="text-xl">
              {darkMode ? <Sun /> : <Moon />}
            </button>
            <button className="relative">
              <Bell />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full" />
            </button>
            <button>
              <Settings />
            </button>
          </div>
        </div>
        {activeCategory === 'Report List' && <LeakageReportList />}
        {activeCategory === 'Plumber Checklist Form' && <PlumberChecklistForm />}
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

