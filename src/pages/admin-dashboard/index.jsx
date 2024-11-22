import React, { useState, useEffect } from 'react';
import { Home, FileText, CheckCircle, LogOut, Users, BookPlus, PenSquare, Bell, Settings, Sun, Moon, HelpCircle, Search, PenLine, Droplet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlumberList from '../plist/PlumberList';
import LeakageReportList from '../home/LeakageReportList';
import ResourcesAd from './resourcesad';
import LeaksFilled from '../../components/LeaksFilled';
import CampaignsEvents from '../eventsandcampaigns';
import { reportService } from '../../services/report';

const AdminDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('Water4Life Dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await reportService.getAllReports();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const handleCategoryClick = (category) => {
    if (category === 'Logout') {
      navigate('/home');
    } else {
      setActiveCategory(category);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const handleMouseLeave = () => {
    setIsSidebarExpanded(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const filteredSidebarItems = [
    { label: 'List of Plumbers', icon: <Users />, category: 'List of Plumbers' },
    { label: 'Plumbers Work Done', icon: <CheckCircle />, category: 'Plumbers Work Done' },
    { label: 'Leakage Report', icon: <FileText />, category: 'Leakage Report' },
    { label: 'Leaks ', icon: <Droplet />, category: 'Leaks Filled' },
    { label: 'Resources', icon: <BookPlus />, category: 'Resources' },
    { label: 'Events & Campaigns', icon: <PenSquare />, category: 'Events/Campaigns' },
    { label: 'Plumbing Materials', icon: <PenLine />, category: 'plumbing materials(sales)' },
  ].filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={`flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-blue-800'}`}>
      <aside
        onMouseEnter={toggleSidebar}
        onMouseLeave={handleMouseLeave}
        className={`h-screen p-4 transition-width duration-300 flex flex-col ${isSidebarExpanded ? 'w-64' : 'w-20'} ${darkMode ? 'bg-gray-800' : 'bg-cyan-300'}`}
      >
        <div className="flex items-center mb-8">
          <img
            src="./images/hat.jpg"
            alt="Water4Life Logo"
            className="w-10 h-10 rounded-full"
          />
          {isSidebarExpanded && (
            <span className="ml-3 text-lg font-bold">Water4Life</span>
          )}
        </div>

        {/* Search Box */}
        <div className="mb-6">
          {isSidebarExpanded && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 pl-10 bg-white text-black rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-2 text-gray-500" />
            </div>
          )}
        </div>
        <nav className="flex-grow">
          <ul>
            {filteredSidebarItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center p-2 cursor-pointer hover:bg-blue-400"
                onClick={() => handleCategoryClick(item.category)}
              >
                {item.icon}
                {isSidebarExpanded && <span className="ml-2">{item.label}</span>}
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
              <HelpCircle className="mr-2 text-blue-800" />
              {isSidebarExpanded && <span className="text-blue-900">Help & Support</span>}
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

      {/* Main Content */}
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

        {/* Active Category Content */}
        {activeCategory === 'List of Plumbers' && <PlumberList />}
        {activeCategory === 'Resources' && <ResourcesAd />}
        {activeCategory === 'Plumbers Work Done' && (
          <div>Your completed plumber work reports will appear here.</div>
        )}
        {activeCategory === 'Leakage Report' && <LeakageReportList />}
        {activeCategory === 'Leaks Filled' && <LeaksFilled isPlumberView={false} />}
        {activeCategory === 'Events/Campaigns' && <CampaignsEvents />}
      </main>
    </div>
  );
};

export default AdminDashboard;
