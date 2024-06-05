import React from "react";
import { FaBed, FaLocationArrow, FaRuler } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiBathtub } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { MdBalcony, MdOutlineGarage } from "react-icons/md";
import { Link } from "react-router-dom";

const ApartmentCard = ({ apartment }) => {
  const {
    _id,
    title,
    details,
    thumbnails,
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
  } = apartment; // Directly destructure from apartment

  console.log(apartment);

  return (
    <Link
      to={`apartments/${_id}`}
      className="shadow-lg rounded-2xl  lg:w-80 w-full"
    >
      <img
        className="md:w-[320px] lg:w-80 w-full h-48 rounded-t-2xl"
        src={thumbnails[1]}
        alt=""
      />
      <div className="p-4">
        <h1 className=" line-clamp-2">{title}</h1>
        <p className="flex gap-1 text-sm pt-2  h-12 text-gray-500">
          <span>
            <IoLocationOutline className="text-xl text-warning" />
          </span>
          <span>{location}</span>
        </p>
        <div className="text-sm flex justify-between py-3 font-semibold text-gray-500">
          <p className="flex items-center gap-2">
            <FaBed /> {bedroom}
          </p>
          <p className="flex items-center gap-2">
            <GiBathtub /> {washroom}
          </p>
          <p className="flex items-center gap-2">
            <MdBalcony /> {balcony}
          </p>
          <p className="flex items-center gap-2">
            <MdOutlineGarage /> {garages}
          </p>
          <p className="flex items-center gap-2">
            <FaRuler /> {size} SqFt
          </p>
        </div>
        <div>
          <p className="text-lg font-medium">{price}Tk</p>
        </div>
      </div>
    </Link>
  );
};

export default ApartmentCard;
