import React from 'react';

const WelcomeSection = () => {
    return (
        <section
            className="relative h-screen bg-cover bg-center bg-no-repeat text-white flex items-center justify-center"
            style={{
                backgroundImage: `url('./src/assets/images/work.jpg')`, 
            }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to💧4Life</h1>
                <p className="text-lg mb-6">Join us in our mission to conserve water,build a sustainable future and serve you better.</p>
                <a
                    href="/home"  route
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
                >
                    Get Started
                </a>
            </div>
        </section>
    );
};

export default WelcomeSection;
