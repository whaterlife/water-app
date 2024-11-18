import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; 

const Pipes = () => {
    return (
        <section className="relative text-lg text-blue-500 bg-[url('src/assets/images/pback.png')] bg-no-repeat bg-cover bg-center py-10 px-4">
            <div className="absolute inset-0 bg-black opacity-50"></div>
               <div className="relative z-20 max-w-screen-md mx-auto mb-6">
                <a href="/home" className="flex items-center text-blue-300 hover:text-blue-500">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
            </div>
           {/* Content */}
            <div className="relative z-10 max-w-screen-lg mx-auto">
                <h3 className="text-white text-3xl md:text-4xl font-bold text-center">Pipe & Fittings</h3>
                <p className="mt-6 text-white text-center max-w-2xl mx-auto">
                    Pipes transport fluids or materials and come in types like PVC, copper, steel, and PEX, chosen for specific needs like durability and resistance. Fittings connect pipe sections, enabling changes in direction, branching, or diameter, with common types including elbows, tees, and couplings. They’re essential in plumbing, industrial, and irrigation systems for efficient, leak-proof flow. Proper selection ensures safety, efficiency, and code compliance.
                </p>
                <div className="mt-10 text-center">
                    <h4 className="text-white mb-6 text-3xl md:text-4xl font-bold">Pipes</h4>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <img src="./src/assets/images/pvc.jpg" alt="PVC pipe image" className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 object-cover" />
                        <img src="./src/assets/images/white.jpg" alt="White pipe image" className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 object-cover" />
                        <img src="./src/assets/images/coper.jpg" alt="Copper pipe image" className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 object-cover" />
                    </div>
                </div>
                <div className="mt-10 text-center">
                    <h4 className="text-white mb-6 text-3xl md:text-4xl font-bold">Fittings</h4>
                    <div className="flex justify-center">
                        <img src="./src/assets/images/fitting.jpg" alt="Fitting image" className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pipes;

