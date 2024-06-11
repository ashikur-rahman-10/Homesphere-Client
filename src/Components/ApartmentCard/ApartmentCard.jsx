import React from "react";
import { FaBed, FaRuler, FaThumbsUp } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { GiBathtub } from "react-icons/gi";
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
    soldBy,
  } = apartment;

  return (
    <Link
      to={`/apartments/${_id}`}
      className="shadow-lg rounded-2xl lg:w-80 w-full"
    >
      <img
        className="md:w-[320px] lg:w-80 w-full h-48 rounded-t-2xl"
        src={thumbnails[0]}
        alt={title}
      />
      <div className="p-4">
        <h1 className="text-sm font-semibold line-clamp-2">{title}</h1>
        <p className="flex gap-1 text-sm pt-2 h-12 text-gray-500">
          <IoLocationOutline className="text-xl text-warning" />
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
        <div className="flex justify-between items-center">
          {/* <div className="flex items-center gap-2  bg-sky-100 rounded-full">
            <div className="bg-slate-200 p-2 rounded-full hover:bg-slate-100">
              <FaThumbsUp className="text-xl hover:text-sky-600 text-sky-400" />
            </div>
            {impression > 0 && (
              <span cl
              assName="text-xs pr-3">{impression}</span>
            )}
           
          </div> */}
          <div className="flex items-center gap-2 ">
            <img className="w-8 rounded-full" src={soldBy?.photoURL} alt="" />
            <p className="text-xs w-24 overflow-hidden">{soldBy?.name}</p>
          </div>
          <p className="text-lg font-medium">{price} Tk</p>
        </div>
      </div>
    </Link>
  );
};

export default ApartmentCard;
