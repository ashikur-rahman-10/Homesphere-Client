import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Team member data with specific image URLs
const teamMembers = [
  {
    name: "John Doe",
    role: "Real Estate Agent",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida interdum justo, eget vehicula lorem.",
    image: "https://i.ibb.co/N3h3PJC/4b58fdd3-e9da-4b9f-b608-59c22ec03d05.jpg",
  },
  {
    name: "Jane Smith",
    role: "Property Manager",
    description:
      "Phasellus non magna vel justo ultricies fermentum. Mauris rhoncus.",
    image: "https://i.ibb.co/n6CNcF7/a222fff7.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "Investment Advisor",
    description: "Integer sed est in lorem porta feugiat vel sed nisl.",
    image: "https://i.ibb.co/PT00qtS/88f77af2-0419-4838-a08e-c8fe572baf76.jpg",
  },
];

const AboutUsPage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="container lg:max-w-6xl md:max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white  px-0 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          About Homesphare
        </h1>

        <div className="prose max-w-none text-gray-700">
          <p>
            Welcome to Homesphare, your trusted partner in real estate services.
            At Homesphare, we are committed to providing exceptional service
            with integrity, transparency, and professionalism.
          </p>

          <h2 className="text-xl font-semibold mt-8">Our Mission</h2>
          <p>
            Our mission at Homesphare is to help individuals and families find
            their dream homes while ensuring a seamless and satisfying
            experience throughout the buying or selling process.
          </p>

          <h2 className="text-xl font-semibold mt-8">Our Vision</h2>
          <p>
            We envision Homesphare as a leading real estate agency known for its
            dedication to client satisfaction, innovation in property solutions,
            and ethical business practices.
          </p>

          <h2 className="text-xl font-semibold mt-8">Why Choose Us?</h2>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Experienced Team: Our team consists of seasoned professionals with
              deep expertise in the real estate market.
            </li>
            <li>
              Personalized Service: We understand that each client’s needs are
              unique, and we tailor our services to exceed expectations.
            </li>
            <li>
              Trusted Relationships: We prioritize trust and transparency in
              every interaction, building long-term relationships with our
              clients.
            </li>
            <li>
              Comprehensive Solutions: Whether buying, selling, or renting, we
              offer comprehensive solutions to meet diverse real estate needs.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8">Meet Our Team</h2>
          <Slider {...sliderSettings} className="mt-6 max-w-2xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="px-4">
                <div className="bg-gray-50 p-4 h-96 rounded-lg shadow-md">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 mask mask-squircle h-48 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                  <p className="mt-2">{member.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
