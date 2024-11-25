import React, { useState } from 'react'
import RootLayout from '../../layouts/RootLayout';
import { Link, useNavigate } from 'react-router-dom';
import { apiLogin, getProfile } from "../../services/users";
import Swal from "sweetalert2";
import styles from '../../styles/BackgroundStyles.module.css';

const PlumberLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.target);
      const payload = {
        email: formData.get("email"),
        password: formData.get("password")
      };

      console.log("Login attempt with:", payload.email);

      const response = await apiLogin(payload);
      console.log("Login successful:", response);

      const profileData = await getProfile();
      console.log("Profile data:", profileData);

      localStorage.setItem("profileData", JSON.stringify(profileData));

      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false
      });

      navigate("/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <RootLayout>
      <div className={`${styles.backgroundImage} ${styles.fixing} flex items-center justify-center`}>
        <div className={`${styles.contentWrapper} bg-neutral-200 bg-opacity-50 p-8 rounded-lg shadow-md w-96`}>
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Plumber Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-bold
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </RootLayout>
  );
};

export default PlumberLogin;