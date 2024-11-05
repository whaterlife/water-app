import React from 'react';

const About = () => {
  const educationTopics = [
    {
      title: "Basic Plumbing Techniques",
      description: "Learn essential techniques for home plumbing repairs and maintenance.",
      imgSrc: "src/assets/images/plum.jpg", 
    },
    {
      title: "Types of Pipes and Fittings",
      description: "Understand different types of pipes and fittings used in plumbing systems.",
      imgSrc: "src/assets/images/emerge.jpg",
    },
    {
      title: "Water Conservation Tips",
      description: "Explore effective methods to conserve water in households.",
      imgSrc: "src/assets/images/water.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-10">Overview</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationTopics.map((topic, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-125 hover:z-10"
              style={{ transition: 'transform 0.3s, z-index 0.3s' }}
            >
              <img src={topic.imgSrc} alt={topic.title} className="w-full h-44 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{topic.title}</h3>
                <p className="text-blue-700">{topic.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
