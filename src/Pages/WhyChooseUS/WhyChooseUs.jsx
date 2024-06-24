import React from "react";
import { FaStar, FaRulerCombined, FaHandshake } from "react-icons/fa";
import { FaHandHoldingHand } from "react-icons/fa6";
import { GiPencilRuler } from "react-icons/gi";
import { PiHandshakeDuotone, PiMedalLight } from "react-icons/pi";

const WhyChooseUs = () => {
  return (
    <div className="w-full mx-auto bg-[#e5fcfd] bg-opacity-30 py-6 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 my-16">
        <h2 className="text-center text-3xl font-bold my-10">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <PiMedalLight className="mx-auto text-6xl text-gray-700 hover:rotate-[360deg] duration-1000 hover:text-warning cursor-pointer" />
            <h3 className="text-xl font-semibold mt-4">Proven Expertise</h3>
            <p className="mt-2 text-gray-500">
              Our seasoned team excels in real estate with years of successful
              market navigation, offering informed decisions and optimal
              results.
            </p>
          </div>
          <div className="text-center">
            <GiPencilRuler className="mx-auto text-6xl text-gray-700 hover:rotate-[360deg] duration-1000 hover:text-warning cursor-pointer" />
            <h3 className="text-xl font-semibold mt-4">Customized Solutions</h3>
            <p className="mt-2 text-gray-500">
              We pride ourselves on crafting personalized strategies to match
              your unique goals, ensuring a seamless real estate journey.
            </p>
          </div>
          <div className="text-center">
            <FaHandHoldingHand className="mx-auto text-6xl text-gray-700 hover:rotate-[360deg] duration-1000 hover:text-warning cursor-pointer" />
            <h3 className="text-xl font-semibold mt-4">
              Transparent Partnerships
            </h3>
            <p className="mt-2 text-gray-500">
              Transparency is key in our client relationships. We prioritize
              clear communication and ethical practices, fostering trust and
              reliability throughout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
