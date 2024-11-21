import React, { useState } from "react";
import { Home } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const campaigns = [
  { id: 1, title: "Water Conservation Workshop", image: "images/flyer1.jpg", description: "Join our workshop on conserving water to help the environment. 28/12/2024 Labone-Junction" },
  { id: 2, title: "Community Clean-Up", image: "images/post.png", description: "Participate in our community clean-up and make a difference! 28/12/2024 Kasoa" },
  { id: 3, title: "Leakage Reporting Awareness", image: "images/save.jpg", description: "Learn how to report leakages effectively to save water." },
  { id: 4, title: "Plumber Training", image: "images/ber.png", description: "A special training session for plumbers on water conservation techniques. Coming soon!" },
  { id: 5, title: "Water-Saving Initiative", image: "images/yard.jpg", description: "Be a part of our initiative to save water in your community." },
];

const CampaignsEvents = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();

  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setExpandedCard(null);
  };
  const closeModal = () => setSelectedCampaign(null);

  const toggleCardSize = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleHomeClick = () => {
    navigate('/camp');
  };

  return (
    <section className="p-8 bg-white">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleHomeClick}
          className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
        >
          <Home size={32} />
        </button>
        <h2 className="text-3xl font-bold text-center text-blue-700">Campaigns & Events</h2>
        <div className="w-8"></div>
      </div>
      <div
        className="grid gap-6"
        style={{
          gridTemplateAreas: `
            "card1 card2"
            "card3 card3"
            "card4 card5"
          `,
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {campaigns.map((campaign, index) => (
          <div
            key={campaign.id}
            style={{ gridArea: `card${index + 1}` }}
            onClick={() => toggleCardSize(campaign.id)}
            className={`relative group overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ${expandedCard === campaign.id ? "scale-105" : "scale-100"} cursor-pointer`}
          >
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              onClick={() => openModal(campaign)}
              className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <h3 className="text-white text-lg font-semibold text-center">{campaign.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedCampaign && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-blue-700">{selectedCampaign.title}</h3>
            </div>
            <img
              src={selectedCampaign.image}
              alt={selectedCampaign.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700">{selectedCampaign.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CampaignsEvents;