import React, { useState } from 'react'
import RootLayout from '../../layouts/RootLayout';
import { Link } from 'react-router-dom';

const PlumberLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle login goes here (e.g., send credentials to server)
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <RootLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6"> Plumber Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Log In
              </button>
            </div>
          </form>
          <div>
            <Link to="/plumber" className="mt-4 text-center text-sm text-blue-500 hover:underline"> 
              Don't have an account? Sign Up!
           </Link>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default PlumberLogin;