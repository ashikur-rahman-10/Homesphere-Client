import React from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = (props) => (
  <button
    {...props}
    className="absolute z-10 left-0 md:left-4 bg-white text-red-500 border border-red-500 p-2 rounded-full focus:outline-none -translate-y-1/2 top-1/2"
    style={{ transform: "translate(-50%, -50%)" }}
  >
    <FaChevronLeft />
  </button>
);

const CustomNextArrow = (props) => (
  <button
    {...props}
    className="absolute z-10 right-0 md:right-4 bg-white text-red-500 p-2 rounded-full border border-red-500 focus:outline-none -translate-y-1/2 top-1/2"
    style={{ transform: "translate(50%, -50%)" }}
  >
    <FaChevronRight />
  </button>
);

const ReviewsPage = () => {
  const [axiosSecure] = UseAxiosSecure();

  // Get reviews data
  const { data: reviews = [], refetch: reviewsRefetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews`);
      return res.data;
    },
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  if (!reviews) {
    return <CustomLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
        What's People Say's
      </h1>
      <p className="text-center text-gray-600 mb-6 max-w-lg mx-auto">
        Our seasoned team excels in real estate with years of successful market
        navigation, offering informed decisions and optimal results.
      </p>
      <Slider {...sliderSettings}>
        {reviews.map((review) => (
          <div key={review._id} className="p-4">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start space-y-4 max-w-2xl mx-auto">
              <div className="flex">
                {Array.from({ length: review.rating }, (_, index) => (
                  <FaStar key={index} className="text-yellow-400 text-xl" />
                ))}
              </div>
              <p className="text-base text-gray-500 font-light text-start h-32 overflow-y-auto">
                {review.review}
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 avatar min-h-12 h-fit mask mask-circle "
                />
                <div>
                  <h2 className="text-lg font-semibold">{review.name}</h2>
                  <p className="text-gray-500">{review.position}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewsPage;
