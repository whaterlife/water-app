import React, { useState, useEffect } from 'react';
import { Droplet, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import Swal from 'sweetalert2';
import { leakService } from '../services/leaks';

const LeaksFilled = () => {
  const [leaksData, setLeaksData] = useState([]);
  const [singleLeak, setSingleLeak] = useState(null);
  const [leakId, setLeakId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const leaksPerPage = 10; // Number of leaks to show per page

  useEffect(() => {
    const fetchLeaksData = async () => {
      try {
        setLoading(true);
        const data = await leakService.getAllLeaks();
        // Sort by date in descending order (newest first)
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setLeaksData(sortedData);
      } catch (error) {
        console.error('Error fetching leak forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaksData();
  }, []);

  // Get current leaks
  const indexOfLastLeak = currentPage * leaksPerPage;
  const indexOfFirstLeak = indexOfLastLeak - leaksPerPage;
  const currentLeaks = leaksData.slice(indexOfFirstLeak, indexOfLastLeak);
  const totalPages = Math.ceil(leaksData.length / leaksPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const fetchSingleLeak = async () => {
    try {
      const data = await leakService.getLeakById(leakId);
      setSingleLeak(data);
    } catch (error) {
      console.error('Error fetching the leak:', error);
    }
  };

  const handleShowDetails = (report) => {
    Swal.fire({
      title: 'Report Details',
      html: `
        <div class="text-left">
          <p><strong>Reporter:</strong> ${report.firstName} ${report.lastName}</p>
          <p><strong>Contact:</strong> ${report.contact}</p>
          <p><strong>Location:</strong> ${report.gpsAddress}</p>
          <p><strong>Description:</strong> ${report.description}</p>
          <p><strong>Status:</strong> ${report.status}</p>
          <p><strong>Reported on:</strong> ${new Date(report.date).toLocaleString()}</p>
          ${report.photo ? `<img src="https://savefiles.org/${report.photo}?shareable_link=491" alt="Leak photo" class="mt-4 max-w-full h-auto"/>` : ''}
        </div>
      `,
      width: '600px',
      confirmButtonColor: '#3085d6',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-blue-800">Leaks Reported</h2>
        <div className="flex items-center gap-2">
          <Droplet className="text-blue-500" />
          <span className="text-lg font-bold text-blue-500">{leaksData.length}</span>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Leak ID"
          value={leakId}
          onChange={(e) => setLeakId(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={fetchSingleLeak}
          className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Get Leak by ID
        </button>
      </div>

      {singleLeak && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-bold">Leak Details</h2>
          <p><strong>Location:</strong> {singleLeak.gpsAddress}</p>
          <p><strong>Reported By:</strong> {`${singleLeak.firstName} ${singleLeak.lastName}`}</p>
          <p><strong>Date:</strong> {singleLeak.date}</p>
          <p><strong>Description:</strong> {singleLeak.description}</p>
          <p><strong>Contact:</strong> {singleLeak.contact}</p>
          <p><strong>Status:</strong> {singleLeak.status || 'Pending'}</p>
          <p><strong>Assigned Plumber:</strong> {singleLeak.assignedPlumber || 'Unassigned'}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentLeaks.map((leak) => (
              <tr key={leak.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{leak.gpsAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap">{`${leak.firstName} ${leak.lastName}`}</td>
                <td className="px-6 py-4 whitespace-nowrap">{leak.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${leak.status === 'Resolved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'}`}>
                    {leak.status || 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{leak.assignedPlumber || 'Unassigned'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleShowDetails(leak)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View Details"
                  >
                    <Info size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
              ${currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
              ${currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstLeak + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastLeak, leaksData.length)}
              </span>{' '}
              of <span className="font-medium">{leaksData.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold
                    ${currentPage === index + 1
                      ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaksFilled; 