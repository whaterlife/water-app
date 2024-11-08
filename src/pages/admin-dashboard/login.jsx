import React, { useState } from 'react'
import RootLayout from '../../layouts/RootLayout';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle login goes here (e.g., send credentials to server)
        console.log('Email:', email, 'Password:', password);
    };

    return (

      <section>
        <Navbar/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-4xl font-bold text-blue-900 text-center mb-6"> Admin</h2>
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
                  <Link to="/admin"  type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Log In
              </Link>
            </div>
          </form>
         
        </div>
      </div>
      </section>
    );
};

export default AdminLogin;

