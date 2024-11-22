import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import { leakService } from "../../services/leaks";
import Swal from "sweetalert2";
import SignaturePad from 'react-signature-canvas';

const LeakReportForm = () => {
    const [formData, setFormData] = useState({
        gpsAddress: '',
        contact: '',
        description: '',
        date: '',
        photo: null,
        signature: ''
    });
    const [loading, setLoading] = useState(false);
    const signaturePadRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const clearSignature = () => {
        signaturePadRef.current.clear();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (signaturePadRef.current.isEmpty()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please provide your signature'
            });
            setLoading(false);
            return;
        }

        const data = new FormData();
        data.append('gpsAddress', formData.gpsAddress);
        data.append('contact', formData.contact);
        data.append('description', formData.description);
        data.append('date', formData.date);
        data.append('photo', formData.photo);
        data.append('signature', signaturePadRef.current.toDataURL());

        try {
            await leakService.createLeak(data);

            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Leak report submitted successfully',
                timer: 1500
            });

            navigate('/home');
            
        } catch (error) {
            console.error('Error submitting leak report:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to submit leak report. Please try again.'
            });
        } finally {
            setLoading(false);
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
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-md font-medium text-white mb-1">
                                Signature
                            </label>
                            <div className="border border-cyan-500 rounded-lg bg-white">
                                <SignaturePad
                                    ref={signaturePadRef}
                                    canvasProps={{
                                        className: "w-full h-40"
                                    }}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={clearSignature}
                                className="mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                            >
                                Clear Signature
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-700 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg transition-colors"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </section>
        </RootLayout>
    );
};

export default LeakReportForm;
