import React, { useState } from 'react';
import { Home, FileText, CheckCircle, LogOut, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState('Home');
  const [rating, setRating] = useState(3); // Default rating can be any number within 5
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Increase rating when a task is completed
  const handleTaskCompletion = () => {
    setRating(prev => (prev < 5 ? prev + 1 : prev)); // Limit to a max of 5 stars
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-orange-800 h-screen p-4">
        <div className="flex items-center mb-6">
          <img
            src="https://via.placeholder.com/100" // Replace with actual image URL
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Jacob Delanyo Dotsey</h2>
            <div className="flex items-center">
              {[...Array(rating)].map((_, index) => (
                <Star key={index} className="text-yellow-400" />
              ))}
            </div>
          </div>
        </div>

        <nav>
          <ul>
            <li className="flex items-center p-2 cursor-pointer hover:bg-blue-200" onClick={() => handleCategoryClick('Home')}> 
              <Link to="/" className="mr-2"><Home /> Home</Link> 
            </li>
            <li className="flex items-center p-2 cursor-pointer hover:bg-blue-200" onClick={() => handleCategoryClick('Leakage Form')}>
              <Link to="/checklist" className="mr-2"><FileText /> Leakage Form</Link>
            </li>
            <li className="flex items-center p-2 cursor-pointer hover:bg-blue-200" onClick={() => handleCategoryClick('Completed Task')}>
              <CheckCircle className="mr-2" />
              Completed Task
            </li>
            <li className="flex items-center p-2 cursor-pointer hover:bg-blue-200" onClick={() => handleCategoryClick('Logout')}>
              <LogOut className="mr-2" />
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-semibold mb-4">{activeCategory}</h1>
        {activeCategory === 'Home' && <div>Your home content goes here.</div>}
        {activeCategory === 'Leakage Form' && <div>Your leakage form content goes here.</div>}
        {activeCategory === 'Completed Task' && (
          <div>
            <p>Your completed tasks will appear here.</p>
            <button 
              onClick={handleTaskCompletion}
              className="mt-4 bg-orange-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Mark Task as Completed
            </button>
          </div>
        )}
        {activeCategory === 'Logout' && <div>You have logged out.</div>}
      </main>
    </div>
  );
};

export default Dashboard;

