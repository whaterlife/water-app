
import React, { useState } from 'react';


const sampleReports = [
  { id: 1, location: 'Downtown', date: '2024-11-01', description: 'Pipe burst on 3rd Ave.' },
  { id: 2, location: 'Uptown', date: '2024-11-02', description: 'Leak near Central Park.' },
  { id: 3, location: 'Downtown', date: '2024-11-03', description: 'Small leak on Main St.' },
  { id: 4, location: 'Suburbia', date: '2024-11-04', description: 'Pipe corrosion near school.' },
];

const LeakageReportList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reports, setReports] = useState(sampleReports);
  const filteredReports = reports.filter((report) =>
    report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white text-blue-700">
      <h1 className="text-2xl font-semibold mb-4">Leakage Reports</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-blue-300 rounded-lg w-full"
        />
      </div>
      <ul className="space-y-4">
        {filteredReports.map((report) => (
          <li key={report.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">{report.location}</h2>
            <p className="text-sm text-blue-500">{report.date}</p>
            <p>{report.description}</p>
          </li>
        ))}
      </ul>

      {filteredReports.length === 0 && (
        <p className="text-center text-blue-500 mt-4">No reports found for the specified location.</p>
      )}
    </div>
  );
};

export default LeakageReportList;
