import React, { useState, useEffect } from 'react';
import RootLayout from '../../layouts/RootLayout';
import { Link, useNavigate } from 'react-router-dom';
import { apiLogin } from '../../services/users';
import Swal from 'sweetalert2';
import styles from '../../styles/BackgroundStyles.module.css';

const UserOther = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        email,
        password
      };

      const response = await apiLogin(payload);

      if (response.token) {
        localStorage.setItem('userToken', response.token);
      }

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
      });

      navigate('/leak');

    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Invalid email or password. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <RootLayout>
      <div className={`${styles.backgroundImage} ${styles.fixing} flex items-center justify-center`}>
        <div className={`${styles.contentWrapper} bg-neutral-200 bg-opacity-50 p-6 rounded shadow-md w-full max-w-md`}>
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button 
                type="submit" 
                className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>
          <div>
            <Link to="/sign" className="mt-4 text-center text-sm text-blue-500 hover:underline"> 
              Don't have an account? Sign Up!
            </Link>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default UserOther;

