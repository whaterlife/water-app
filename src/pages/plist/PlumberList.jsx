import React, { useState } from "react";
import { List, Grid } from "lucide-react";

const plumbers = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Plumber ${index + 1}`,
    location: `City ${index + 1}`,
    contact: `123-456-78${index}`,
    image: `https://via.placeholder.com/150`,
}));

const PlumberList = () => {
    const [isGridView, setIsGridView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(plumbers.length / itemsPerPage);
    const currentItems = plumbers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section className="p-6 bg-gray-100 min-h-screen">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-blue-500">Our Plumbers</h1>
                <button
                    onClick={() => setIsGridView(!isGridView)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    {isGridView ? <List size={20} /> : <Grid size={20} />}
                </button>
            </div>
            <div className={`grid ${isGridView ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "grid-cols-1 space-y-4"}`}>
                {currentItems.map((plumber) => (
                    <div
                        key={plumber.id}
                        className={`${isGridView
                                ? "flex bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105"
                                : "p-4 border border-gray-300 rounded-lg bg-transparent w-full sm:w-2/3 mx-auto"
                            }`}
                    >
                        {isGridView && (
                            <img
                                src={plumber.image}
                                alt={plumber.name}
                                className="w-24 h-24 sm:w-32 sm:h-32 object-cover"
                            />
                        )}
                        <div className="p-4 flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">{plumber.name}</h2>
                                <p className="text-gray-600">{plumber.location}</p>
                            </div>
                            <p className="text-blue-500 font-semibold">{plumber.contact}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 rounded-lg ${currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            } hover:bg-blue-400 transition`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default PlumberList;


