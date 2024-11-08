import React from "react";
import { Droplets } from "lucide-react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import About from "../about";
import Statistics from "../statistics";

const Hero = () => {
    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate('/adlog'); 
    };

    return (
        <RootLayout>
            <section className="relative bg-cover bg-center h-screen bg-[url('src/assets/images/more.jpg')] flex items-center">
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
                    <h2 className="text-2xl font-bold mb-4 text-blue-700">Report a Leakage</h2>
                    <form className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="text-md font-medium text-blue-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="text-md font-medium text-blue-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="subject"
                                className="text-md font-medium text-blue-700"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="text-md font-medium text-blue-700"
                            >
                                Message
                            </label>
                            <textarea
                                placeholder="Message"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                            ></textarea>
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
