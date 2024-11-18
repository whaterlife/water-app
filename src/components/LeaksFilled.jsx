import React, { useState, useEffect } from 'react';
import { Droplet, Info } from 'lucide-react';
import Swal from 'sweetalert2';

const LeaksFilled = () => {
  const [leaksData, setLeaksData] = useState([]);
  const [singleLeak, setSingleLeak] = useState(null);
  const [leakId, setLeakId] = useState('');

  useEffect(() => {
    const fetchLeaksData = async () => {
      try {
        const response = await fetch('https://water-api-329b.onrender.com/leakforms/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2EwNDQzOTI1YTIwMjJkZGQ2OTc5NiIsImlhdCI6MTczMTg2OTQ0NywiZXhwIjoxNzMxOTU1ODQ3fQ.r9Y_pdl84liwocIfOEDwCkDCWGP3ALOprPLQyFdktig`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leak forms');
        }

        const data = await response.json();
        setLeaksData(data);
      } catch (error) {
        console.error('Error fetching leak forms:', error);
      }
    };

    fetchLeaksData();
  }, []);

  const fetchSingleLeak = async () => {
    try {
      const response = await fetch(`https://water-api-329b.onrender.com/leakforms/${leakId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2EwNDQzOTI1YTIwMjJkZGQ2OTc5NiIsImlhdCI6MTczMTg2OTQ0NywiZXhwIjoxNzMxOTU1ODQ3fQ.r9Y_pdl84liwocIfOEDwCkDCWGP3ALOprPLQyFdktig`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the leak');
      }

      const data = await response.json();
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
            {leaksData.map((leak) => (
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

      <div className="mt-4 flex justify-center">
        <button className="text-blue-500 hover:text-blue-700">
          Load More
        </button>
      </div>
    </div>
  );
};

export default LeaksFilled; 