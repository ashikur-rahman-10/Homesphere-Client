import React from "react";
import { FaLocationDot, FaMagnifyingGlass } from "react-icons/fa6";
import banner from "../../../assets/banner2.jpg";

const TopBanner = () => {
  return (
    <div className="flex justify-between md:flex-row flex-col-reverse relative lg:h-[690px]  mx-auto w-full">
      <div className="md:w-[700px] flex items-center justify-start lg:pl-32 md:pl-10 bg-gradient-to-br from-[#aef7fa] via-white to-white gradientColorStopPositions-33">
        <div className="max-w-[400px]  space-y-5 px-4">
          <h1 className="text-3xl md:text-4xl text-[#1B1C57] uppercase font-bold py-3">
            find the place to live{" "}
            <span className="text-accent">your dreams</span> easily here
          </h1>
          <p className="text-[#626687]">
            Everything you need about finding your place to live will be here,
            where it will be easier for you
          </p>
          <form className="max-w-[496px] w-full relative border-2 rounded-full p-[2px] ">
            <FaLocationDot className="absolute left-2 top-[14px] text-lg text-yellow-500" />
            <input
              className=" w-full pl-8 py-3 rounded-full text-sm"
              placeholder="Search for the location you want!"
              type="text"
            />

            <button
              type="submit"
              className="bg-[#10b981] absolute z-10 cursor-pointer hover:bg-green-600 right-[3px] top-[4px] flex items-center rounded-full gap-2 py-2 px-4 text-white"
            >
              Search <FaMagnifyingGlass />
            </button>
          </form>
        </div>
      </div>
      <div className="md:w-[695px] w-full saturate-200">
        <img className="rounded-bl-[70px] " src={banner} alt="" />
      </div>
    </div>
  );
};

export default TopBanner;
