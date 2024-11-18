import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock } from 'lucide-react';

const LeakageReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('https://water-api-329b.onrender.com/reports/gets', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2EwNDQzOTI1YTIwMjJkZGQ2OTc5NiIsImlhdCI6MTczMTg2OTQ0NywiZXhwIjoxNzMxOTU1ODQ3fQ.r9Y_pdl84liwocIfOEDwCkDCWGP3ALOprPLQyFdktig`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const pendingReports = reports.filter(report => !report.status || report.status === 'Pending');
  const resolvedReports = reports.filter(report => report.status === 'Resolved');

  return (
    <div className="p-6 bg-white text-blue-700">
      <h1 className="text-2xl font-semibold mb-6">Leakage Reports</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Reports */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Reports</p>
              <h3 className="text-3xl font-bold text-blue-900 mt-1">{reports.length}</h3>
            </div>
            <div className="bg-blue-200 rounded-full p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Pending Reports */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Pending</p>
              <h3 className="text-3xl font-bold text-yellow-900 mt-1">{pendingReports.length}</h3>
            </div>
            <div className="bg-yellow-200 rounded-full p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Resolved Reports */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Resolved</p>
              <h3 className="text-3xl font-bold text-green-900 mt-1">{resolvedReports.length}</h3>
            </div>
            <div className="bg-green-200 rounded-full p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reporter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{report.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.fullName}</td>
                <td className="px-6 py-4">
                  <div className="max-w-xs overflow-hidden text-ellipsis">
                    {report.message}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(report.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${report.status === 'Resolved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    {report.status || 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeakageReportList;
