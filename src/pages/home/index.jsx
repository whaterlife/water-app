import React, { useState } from "react";
import { Droplets } from "lucide-react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import About from "../about";
import Statistics from "../statistics";
import { reportService } from "../../services/report";
import Swal from "sweetalert2";

const Hero = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photo: null,
        message: '',
        location: ''
    });

    const handleAdminClick = () => {
        navigate('/admin-login');
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('fullName', formData.name);
        data.append('email', formData.email);
        data.append('photo', formData.photo);
        data.append('message', formData.message);
        data.append('location', formData.location);

        try {
            const response = await reportService.createReport(data);

            if (response) {
                console.log('Report submitted successfully:', response);
                Swal.fire('Success', 'Report submitted successfully!', 'success');
            }
        } catch (error) {
            console.error('Error submitting report:', error);
            Swal.fire('Error', 'Error submitting report. Please try again.', 'error');
        }
    };

    return (
        <RootLayout>
            <section className="relative bg-cover bg-center h-screen bg-[url('images/pipes.jpg')] flex items-center">
                <div className="absolute inset-0"></div>
                <div className="absolute top-35 left-20 z-10 max-w-md">
                    <h5 className="text-2xl font-bold text-white flex items-center pb-10">WELCOME TO</h5>
                    <h1 className="text-4xl font-bold text-white flex items-center">
                        <Droplets className="mr-2 text-blue-700" size={80} />
                        4LIFE
                    </h1>
                    <p className="text-white font-mono mt-4">
                        Leakages are stressful. With our specialists, we will work faster with the least damage possible.
                    </p>
                </div>

                {/* Form Container */}
                <div className="relative z-10 w-full md:w-1/3 bg-white bg-opacity-10 p-8 rounded-lg shadow-lg ml-auto mr-12">
                    <h2 className="text-2xl font-bold mb-4 text-white">Report a Leakage</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="text-md font-medium text-white">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-md font-medium text-white">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="photo" className="text-md font-medium text-white">Photo</label>
                            <input
                                type="file"
                                name="photo"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                accept="image/*"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="text-md font-medium text-white">Message</label>
                            <textarea
                                name="message"
                                placeholder="Message"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="location" className="text-md font-medium text-white">Location</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Enter location"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-400 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg transition-colors"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <button
                    onClick={handleAdminClick}
                    className="absolute bottom-4 left-4 p-3 rounded-full bg-blue-700 text-white hover:bg-blue-600 transition"
                    title="Admin Login"
                >
                    <FiUser size={20} />
                </button>
            </section>
            <Statistics />
            <About />
        </RootLayout>
    );
};

export default Hero;
