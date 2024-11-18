import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; 

const WaterConservationTips = () => {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat text-white py-10 px-6"
            style={{
                backgroundImage: `url('src/assets/images/this.jpg')`, 
            }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            
            <div className="relative z-20 max-w-screen-md mx-auto mb-6">
                <a href="/home" className="flex items-center text-blue-300 hover:text-blue-500">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
            </div>
            <div className="relative z-10 max-w-screen-md mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Water Conservation Tips</h2>
                <ul className="space-y-4 text-lg">
                    <li>💧 Fix leaks as soon as they appear to prevent water waste.</li>
                    <li>🚿 Take shorter showers and install low-flow showerheads to reduce water use.</li>
                    <li>🧼 Turn off the tap while brushing your teeth or shaving.</li>
                    <li>🌱 Use a broom instead of a hose to clean driveways, sidewalks, and patios.</li>
                    <li>🚽 Upgrade to low-flow toilets and faucets to save water without reducing performance.</li>
                    <li>🌧️ Collect rainwater in barrels or containers to water your plants and garden.</li>
                    <li>🕒 Water plants in the early morning or late evening to minimize evaporation.</li>
                    <li>🍽️ Run the dishwasher and laundry only with full loads to maximize water efficiency.</li>
                    <li>🌾 Opt for drought-resistant plants in your garden to minimize watering needs.</li>
                    <li>🚰 Keep a bottle of drinking water in the fridge instead of running the tap to cool it down.</li>
                    <li>💦 Avoid using sprinklers on windy days to prevent water loss due to wind drift.</li>
                    <li>🚙 Wash your car less frequently, or use a waterless car wash product.</li>
                    <li>🥣 Reuse cooking water (like from pasta or vegetables) to water plants once it cools down.</li>
                    <li>🌊 Regularly check outdoor irrigation systems for leaks or blockages to ensure efficiency.</li>
                </ul>
            </div>
        </section>
    );
};

export default WaterConservationTips;
