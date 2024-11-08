import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import RootLayout from "../../layouts/RootLayout";

const LeakReportForm = () => {
    const sigCanvas = useRef(null);

    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    return (
        <RootLayout>
            <section className="flex justify-center items-center min-h-screen pt-20 pb-10 bg-[url('src/assets/images/pipes.jpg')]">
            <div className=" p-8 rounded-lg shadow-lg w-full max-w-md">
                
                <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                    Water Leakage
                </h1>
                
                {/* Form */}
                <form className="space-y-4">
                    
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-md font-medium text-white mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-md font-medium text-white mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-bue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className=" text-white block text-md font-medium text-whitemb-1">
                            GPS Address
                        </label>
                        <input
                            type="text"
                            placeholder="Enter GPs address"
                            className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    
                    <div>
                        <label className="block text-md font-medium text-white mb-1">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Phone Number"
                            className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-md font-medium text-white mb-1">
                            Description of Leakage
                        </label>
                        <textarea
                            placeholder="Describe the leakage"
                            className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                        ></textarea>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-md font-medium text-white mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-md font-medium text-white mb-1">
                                Time
                            </label>
                            <input
                                type="time"
                                className="w-full px-4 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-md font-medium text-white mb-1">
                            Signature
                        </label>
                        <div className="border border-cyan-500 rounded-lg bg-white p-2">
                            <SignatureCanvas
                                ref={sigCanvas}
                                penColor="black"
                                canvasProps={{
                                    className: "w-full h-24 bg-white rounded-lg",
                                }}
                            />
                            <button
                                type="button"
                                onClick={clearSignature}
                                className="mt-2 text-sm text-blue-500 underline"
                            >
                                Clear Signature
                            </button>
                        </div>
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
