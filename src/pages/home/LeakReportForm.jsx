import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";

const LeakReportForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gpsAddress: '',
        contact: '',
        description: '',
        date: '',
        photo: null,
        signature: ''
    });

    const navigate = useNavigate();

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
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('gpsAddress', formData.gpsAddress);
        data.append('contact', formData.contact);
        data.append('description', formData.description);
        data.append('date', formData.date);
        data.append('photo', formData.photo);
        data.append('signature', formData.signature);

        const token = localStorage.getItem('userToken');
        console.log('Token:', token);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/leakforms/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: data
            });

            if (response.status === 201) {
                const result = await response.json();
                console.log('Leak report submitted successfully:', result);
                alert('Leak report submitted successfully!');
                navigate('/home');
            } else {
                throw new Error(`Failed to submit leak report: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error submitting leak report:', error);
            alert('Error submitting leak report. Please try again.');
        }
    };

    return (
        <RootLayout>
            <section className="flex justify-center items-center min-h-screen pt-20 pb-10 bg-[url('public/images/pipes.jpg')]">
                <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                        Water Leakage
                    </h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block text-md font-medium text-white mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-md font-medium text-white mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-md font-medium text-white mb-1">
                                GPS Address
                            </label>
                            <input
                                type="text"
                                name="gpsAddress"
                                placeholder="Enter GPS address"
                                className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-md font-medium text-white mb-1">
                                Contact
                            </label>
                            <input
                                type="text"
                                name="contact"
                                placeholder="Enter Contact Information"
                                className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-md font-medium text-white mb-1">
                                Description of Leakage
                            </label>
                            <textarea
                                name="description"
                                placeholder="Describe the leakage"
                                className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block text-md font-medium text-white mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-md font-medium text-white mb-1">
                                    Photo
                                </label>
                                <input
                                    type="file"
                                    name="photo"
                                    className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    accept="image/*"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-md font-medium text-white mb-1">
                                Signature
                            </label>
                            <input
                                type="text"
                                name="signature"
                                placeholder="Enter your signature"
                                className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-700 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg transition-colors"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
        </RootLayout>
    );
};

export default LeakReportForm;
