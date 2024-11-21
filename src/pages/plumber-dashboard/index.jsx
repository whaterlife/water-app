import React, { useState, useEffect } from 'react';
import { Home, FileText, CheckCircle, LogOut, Star, Bell, Settings, Sun, Moon, HelpCircle, Search, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlumberChecklistForm from '../plist/PlumbersCheckList';
import LeaksFilled from '../../components/LeaksFilled';
import EditProfileForm from '../../components/EditProfileForm';
import { getProfile } from '../../services/users';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState('My Dashboard');
  const [rating, setRating] = useState(3);
  const [showEditLabel, setShowEditLabel] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        // First try to get from localStorage
        const storedProfile = localStorage.getItem("profileData");
        if (storedProfile) {
          setProfileData(JSON.parse(storedProfile));
          setLoading(false);
        }

        // Then fetch fresh data
        const freshData = await getProfile();
        if (freshData) {
          setProfileData(freshData);
          localStorage.setItem("profileData", JSON.stringify(freshData));
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        if (error.message.includes('token')) {
          navigate('/plogin');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/home');
  };

  const handleCategoryClick = (category) => {
    if (category === 'Logout') {
      handleLogout();
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

  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowEditForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!profileData) {
    navigate('/plogin');
    return null;
  }

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
        <div className="flex flex-col mb-6">
          <div className="flex items-center">
            <img
              src={`https://savefiles.org/${profileData.photo}?shareable_link=543`}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            {isSidebarExpanded && (
              <div className="ml-4">
                <h2 className="text-lg font-semibold">
                  {`${profileData.firstname} ${profileData.lastname}`}
                </h2>
                <p className="text-sm text-gray-500">{profileData.officeName}</p>
                <p className="text-sm text-gray-500">{profileData.phoneNumber}</p>
                <p className="text-sm text-gray-500">{profileData.email}</p>
                <p className="text-sm text-gray-500">{profileData.location}</p>
                <div className="flex items-center">
                  {[...Array(rating)].map((_, index) => (
                    <Star key={index} className="text-cyan-400" />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {isSidebarExpanded && (
            <div className="flex mt-3 ml-2">
              <button
                className="flex items-center justify-center w-8 h-8 bg-white rounded-full hover:bg-gray-100"
                onMouseEnter={() => setShowEditLabel(true)}
                onMouseLeave={() => setShowEditLabel(false)}
                onClick={handleEditClick}
              >
                <Edit size={16} className="text-green-600" />
                {showEditLabel && (
                  <span className="absolute left-20 px-2 py-1 bg-green-400 text-green-950 text-xs rounded-md whitespace-nowrap">
                    Edit Profile
                  </span>
                )}
              </button>
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
          <h1 className="text-2xl font-semibold">
            {activeCategory === 'My Dashboard' 
              ? `Welcome, ${profileData.firstname}!` 
              : activeCategory}
          </h1>
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
        {activeCategory === 'Report List' && <LeaksFilled isPlumberView={false} />}
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
      {showEditForm && (
        <EditProfileForm
          onClose={() => setShowEditForm(false)}
          currentUser={profileData}
        />
      )}
    </div>
  );
};

export default Dashboard;

