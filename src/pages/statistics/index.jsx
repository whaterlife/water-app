import React from 'react';

const Statistics = () => {
  return (
    <div className="text-center px-6 py-8">
      <h2 className="text-4xl font-bold text-blue-800 mb-8">Trend</h2>
      <div className="flex justify-center space-x-6 mb-4">
        <img src="./images/piechart1.png" alt="Pie Chart" className="w-1/3 h-auto rounded-lg shadow-md" />
        <img src="./images/waste.png" alt="Waste Chart" className="w-1/3 h-auto rounded-lg shadow-md" />
      </div>
      <p className="text-lg text-blue-600 max-w-2xl mx-auto leading-relaxed mt-4">
        "In Ghana, up to 50% of treated water is lost through pipeline leaks, burst pipes, and illegal connections, significantly reducing available water supplies. This wastage challenges the Ghana Water Company Limited (GWCL) in meeting the needs of urban populations. The World Health Organization (WHO) emphasizes that such inefficiencies exacerbate public health issues, increasing the spread of waterborne diseases and burdening healthcare systems. The World Bank’s Water Resources Management program also highlights water scarcity in Ghana, driven by climate change, poor resource management, rapid urbanization, and population growth. Solutions advocated by the World Bank include investing in infrastructure improvements, technology for leak detection, and promoting community water conservation practices to sustain resources for the future."
      </p>
    </div>
  );
}

export default Statistics;
