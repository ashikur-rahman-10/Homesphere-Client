import React from "react";
import { useParams } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import {
  FaBed,
  FaHammer,
  FaHeart,
  FaLocationDot,
  FaRuler,
} from "react-icons/fa6";
import { GiBathtub } from "react-icons/gi";
import { MdBalcony, MdOutlineGarage } from "react-icons/md";

const ApartmentDetails = () => {
  const { id } = useParams();
  const [axiosSecure] = UseAxiosSecure();

  // Get apartment data
  const { data: apartment = {}, refetch: apartmentRefetch } = useQuery({
    queryKey: ["apartment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/apartments/${id}`);
      return res.data;
    },
  });

  const onChange = (index, item) => {};

  const onClickItem = (index, item) => {};

  const onClickThumb = (index, item) => {};

  const {
    thumbnails = [],
    _id,
    title,
    details,
    floorPlan,
    bedroom,
    washroom,
    garages,
    size,
    location,
    price,
    keywords,
    postedIn,
    impression,
    balcony,
    buildYear,
  } = apartment;

  return (
    <div className="py-16 lg:px-36 px-2">
      <div className="w-full flex flex-col md:flex-row justify-between pt-10">
        <div className="apartment-details h-[500px] w-full md:max-w-[48%]">
          {thumbnails.length > 0 ? (
            <Carousel
              showArrows={true}
              onChange={onChange}
              onClickItem={onClickItem}
              onClickThumb={onClickThumb}
              autoPlay={true}
            >
              {thumbnails.map((thumbnail, index) => (
                <div key={index} className="flex justify-center">
                  <img
                    className="mg:max-h-96 max-h-80  rounded-md"
                    src={thumbnail}
                    alt={`Slide ${index}`}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <p>No images available</p>
          )}
        </div>
        <div className="w-full md:w-[48%] px-2">
          <h1 className="text-xl">{title}</h1>
          <p className="flex gap-1 items-center pt-2">
            <FaLocationDot></FaLocationDot>
            {location}
          </p>
          <h3 className="text-xl pt-10">Features:</h3>
          <div className="md:text-base text-sm grid grid-cols-3  gap-5  py-3 font-medium text-gray-400">
            <div className="flex items-center gap-2">
              <FaBed className="text-3xl text-red-400" />

              <p className="flex flex-col">
                Bedrooms:
                <span className="text-black">{bedroom}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <GiBathtub className="text-3xl text-red-400" />
              <p className="flex flex-col">
                Washrooms: <span className="text-black"> {washroom}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MdBalcony className="text-3xl text-red-400" />{" "}
              <p className="flex flex-col">
                Balcony: <span className="text-black">{balcony}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineGarage className="text-3xl text-red-400" />{" "}
              <p className="flex flex-col">
                Garages: <span className="text-black">{garages}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaRuler className="text-3xl text-red-400" />{" "}
              <p className="flex flex-col">
                Washrooms: <span className="text-black"> {size} SqFt</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaHammer className="text-3xl text-red-400" />{" "}
              <p className="flex flex-col">
                Year Built: <span className="text-black"> {buildYear}</span>
              </p>
            </div>
          </div>
          <div className="pt-6">
            <button className="flex items-center gap-2 bg-red-50 px-4 py-1 rounded-md text-red-400 uppercase outline outline-red-100 hover:bg-red-400 hover:text-white duration-500">
              <FaHeart /> Save
            </button>
          </div>
        </div>
      </div>
      <div className="pb-16">
        <p className="text-xl pb-4">
          bdt<span className="text-3xl">{price}</span>
        </p>
        <p className="text-[#757575]">{details}</p>
        <img className="pt-10 w-full px-4" src={floorPlan} alt="" />
      </div>
    </div>
  );
};

export default ApartmentDetails;
