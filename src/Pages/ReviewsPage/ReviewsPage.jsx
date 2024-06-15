import React from "react";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";

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
  };

  if (!reviews) {
    return <CustomLoader />;
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl text-gray-600 py-10 text-center">
        What Our Users Say About Us
      </h1>
      <Slider {...sliderSettings}>
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-6 rounded-xl h-96 lg:h-80 border"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center">
                  {Array.from({ length: review.rating }, (_, index) => (
                    <FaStar key={index} className="text-yellow-400 text-2xl" />
                  ))}
                </div>
                <p className="mb-4 whitespace-pre-wrap font-sans">
                  {review.review}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="mask mask-circle w-12 mr-4"
                />
                <div>
                  <h2 className="text-sm font-semibold">{review.name}</h2>
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
