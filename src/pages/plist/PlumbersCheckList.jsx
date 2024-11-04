import React, { useState } from "react";

const PlumberChecklistForm = () => {
    const [formData, setFormData] = useState({
        plumberName: "",
        location: "",
        descriptionOfWork: "",
        causeOfLeakage: "",
        assessment: {
            noStagnantWater: "",
            noInvisibleLeakage: "",
            noDamage: "",
        },
        notes: {
            noStagnantWater: "",
            noInvisibleLeakage: "",
            noDamage: "",
        },
        specificAreaOfConcern: "",
        photo: null,
        recommendations: "",
        date: "",
    });

    const handleRadioChange = (e, field) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            assessment: { ...prev.assessment, [field]: value },
            notes: { ...prev.notes, [field]: value === "Notes" ? "" : prev.notes[field] },
        }));
    };

    const handleNotesChange = (e, field) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            notes: { ...prev.notes, [field]: value },
        }));
    };

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === "file") {
            setFormData((prev) => ({ ...prev, photo: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };

    return (
        <section className="p-6 min-h-screen flex flex-col lg:flex-row items-start ">
            {/* Form Container */}
            <div className="w-full lg:w-1/2 p-6 shadow-md space-y-4 h-[977px]">
                <h1 className="text-2xl font-bold text-orange-500 mb-4">Plumber Checklist</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="plumberName">
                            Plumber Name
                        </label>
                        <input
                            type="text"
                            name="plumberName"
                            value={formData.plumberName}
                            onChange={handleChange}
                            placeholder="Enter plumber's name"
                            className="w-full p-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="location">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter location"
                            className="w-full p-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="descriptionOfWork">
                            Description of Work
                        </label>
                        <textarea
                            name="descriptionOfWork"
                            value={formData.descriptionOfWork}
                            onChange={handleChange}
                            placeholder="Describe the work performed"
                            className="w-full p-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-24 resize-none"
                        ></textarea>
                    </div>
                     <div>
                        <h2 className="text-lg font-semibold mb-2">Property Assessment</h2>
                        {[
                            { key: "noStagnantWater", label: "No indication of stagnant water present" },
                            { key: "noInvisibleLeakage", label: "No invisible signs of leakage around septic tanks" },
                            { key: "noDamage", label: "No damages upon inspection" },
                        ].map(({ key, label }) => (
                            <div key={key} className="mb-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-gray-700 font-semibold">{label}</label>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name={key}
                                                value="Yes"
                                                checked={formData.assessment[key] === "Yes"}
                                                onChange={(e) => handleRadioChange(e, key)}
                                                className="mr-1"
                                            />
                                            Yes
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name={key}
                                                value="No"
                                                checked={formData.assessment[key] === "No"}
                                                onChange={(e) => handleRadioChange(e, key)}
                                                className="mr-1"
                                            />
                                            No
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name={key}
                                                value="Notes"
                                                checked={formData.assessment[key] === "Notes"}
                                                onChange={(e) => handleRadioChange(e, key)}
                                                className="mr-1"
                                            />
                                            Notes
                                        </label>
                                    </div>
                                </div>
                                {formData.assessment[key] === "Notes" && (
                                    <input
                                        type="text"
                                        name={key}
                                        value={formData.notes[key]}
                                        onChange={(e) => handleNotesChange(e, key)}
                                        placeholder="Enter additional notes"
                                        className="w-full p-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="photo">
                            Upload Photo
                        </label>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            className="w-full p-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="recommendations">
                            Recommendations
                        </label>
                        <textarea
                            name="recommendations"
                            value={formData.recommendations}
                            onChange={handleChange}
                            placeholder="Enter recommendations"
                            className="w-full p-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-24 resize-none"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1" htmlFor="date">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-4 w-full bg-orange-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-lg transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div className="hidden lg:block lg:w-1/2">
                <img
                    src="../src/assets/images/like.jpg"
                    alt="image"
                    className="shadow-lg object-cover h-full w-full"
                />
            </div>
        </section>
    );
};

export default PlumberChecklistForm;


