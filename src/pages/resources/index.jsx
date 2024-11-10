import React from 'react';
import { Link } from 'react-router-dom';
const Resources = () => {
  return (
    <section className="p-6 bg-white">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Resources</h2>

      <div className="space-y-4">
        <div>
          <h4 className="text-xl font-semibold text-blue-800">Mapping API</h4>
          <p className="text-gray-600">Integrate a mapping tool (like Google Maps API) for location tagging so users can precisely mark the leak location.</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-blue-800">Notification Service</h4>
          <p className="text-gray-600">Set up SMS or email notifications to alert the water management team instantly when a leak is reported.</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-blue-800">Image Upload Support</h4>
          <p className="text-gray-600">Allow users to upload photos of the leak, helping the maintenance team assess severity and prepare accordingly.</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-blue-800">Form Handling and Validation</h4>
          <p className="text-gray-600">Libraries like Formik or React Hook Form can streamline handling user input, and client-side validation ensures data accuracy.</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-blue-800">Data Analytics</h4>
          <p className="text-gray-600">Utilize analytics tools to track trends in leakage reports, such as frequent areas, time patterns, or specific causes, aiding preventive measures.</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-blue-800">Mobile Compatibility</h4>
          <p className="text-gray-600">Ensure the interface is mobile-friendly, as users might report leaks directly from the field. Tailwind CSS and mobile-focused frameworks can help with this.</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-blue-800">Customer Support Channel</h4>
          <p className="text-gray-600">Incorporate an integrated chat or support option for users who might need assistance completing the form.</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-blue-800">Backend Storage and Databases</h4>
          <p className="text-gray-600">Secure storage (e.g., AWS, Firebase) is essential to store report data, images, and historical records for future reference and analysis.</p>
        </div>
      </div>
      <Link 
        to="/" 
        className="absolute bottom--1 right-0 bg-blue-500 text-white py-2 px-4 rounded hover:bg-cyan-600 transition duration-300"
      >
        Back to Home Page
      </Link>

    </section>
  );
};

export default Resources;
