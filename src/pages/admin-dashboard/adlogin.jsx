import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { apiLogin } from '../../services/users';
import Swal from 'sweetalert2';
import styles from '../../styles/BackgroundStyles.module.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await apiLogin({ email, password });
            
            // Check if the logged-in user is an admin
            const profileData = JSON.parse(localStorage.getItem('profileData'));
            if (profileData && profileData.role === 'admin') {
                await Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome Admin!',
                    timer: 1500
                });
                navigate('/admin-dashboard');
            } else {
                // If not admin, show error and clear storage
                localStorage.removeItem('userToken');
                localStorage.removeItem('profileData');
                throw new Error('Unauthorized access');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid admin credentials'
            });
        }
    };

    return (
        <section>
            <Navbar />
            <div className={`${styles.backgroundImage} ${styles.newtools} flex items-center justify-center`}>
                <div className={`${styles.contentWrapper} bg-neutral-200 bg-opacity-50 p-6 rounded shadow-md w-full max-w-md`}>
                    <h2 className="text-4xl font-bold text-blue-900 text-center mb-6">Admin</h2>
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
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AdminLogin;

