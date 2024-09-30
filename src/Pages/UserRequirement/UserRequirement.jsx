import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBed,
  FaMagnifyingGlass,
  FaRuler,
} from "react-icons/fa6";
import UseApartment from "../../Hooks/UseApartment";
import Slider from "rc-slider";
import ApartmentCard from "../../Components/ApartmentCard/ApartmentCard";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { GiBathtub } from "react-icons/gi";
import { MdBalcony, MdOutlineGarage } from "react-icons/md";
import { FaArrowCircleDown } from "react-icons/fa";

const UserRequirement = () => {
  const { apartments } = UseApartment();
  const [priceRange, setPriceRange] = useState([1000000, 100000000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedWashroom, setSelectedWashroom] = useState([]);
  const [selectedGarages, setSelectedGarages] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const approvedApartments = apartments.filter(
    (a) => a.postStatus === "approved"
  );

  // Handle Size change
  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Handle Bedroom change
  const handleBedroomChange = (bedroom) => {
    setSelectedBedrooms((prev) =>
      prev.includes(bedroom)
        ? prev.filter((b) => b !== bedroom)
        : [...prev, bedroom]
    );
  };

  // Handle washroom change
  const handleWashroomChange = (washroom) => {
    setSelectedWashroom((prev) =>
      prev.includes(washroom)
        ? prev.filter((b) => b !== washroom)
        : [...prev, washroom]
    );
  };

  // Handle Price Range change
  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const sizeOptions = [
    "500-700",
    "701-900",
    "901-1100",
    "1101-1500",
    "above 1500",
  ];
  const bedroomOptions = ["2", "3", "4", "5", "above 5"];
  const washroomOptions = ["1", "2", "3", "4"];
  const garageOptions = ["1", "2", "3"];

  // Filter apartments based on search term, price range, size, and bedrooms
  const filteredApartments = approvedApartments.filter((a) => {
    const matchesSearchTerm =
      a?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a?.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a?.keywords?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice = a.price >= priceRange[0] && a.price <= priceRange[1];

    const matchesSize =
      selectedSizes.length === 0 ||
      selectedSizes.some((size) => {
        if (size === "above 1500") {
          return parseInt(a.size) > 1500;
        }
        const [min, max] = size.split("-").map(Number);
        return parseInt(a.size) >= min && parseInt(a.size) <= max;
      });

    const matchesBedroom =
      selectedBedrooms.length === 0 ||
      selectedBedrooms.some((bed) => {
        if (bed === "above 5") {
          return parseInt(a.bedroom) > 5;
        }
        return parseInt(a.bedroom) === parseInt(bed);
      });

    const matchesWashroom =
      selectedWashroom.length === 0 ||
      selectedWashroom.some((washroom) => {
        return parseInt(a.washroom) === parseInt(washroom);
      });

    const matchesGarages =
      selectedGarages.length === 0 ||
      selectedGarages.some((garage) => {
        if (garage === "above 3") {
          return parseInt(a.garages) > 3;
        }
        return parseInt(a.garages) === parseInt(garage);
      });

    return (
      matchesSearchTerm &&
      matchesPrice &&
      matchesSize &&
      matchesBedroom &&
      matchesWashroom &&
      matchesGarages
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredApartments.length / itemsPerPage);
  const currentItems = filteredApartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Toggle filter visibility
  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  //   Submit btn

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.searchTerm.value);
  };

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="w-full mx-auto min-h-screen pt-16 relative">
      <div className="flex flex-col lg:flex-row pt-4">
        <div className=" ">
          <div
            className={`bg-gray-200 lg:w-80 w-fit h-[91vh] p-4 absolute lg:relative duration-500 z-10 lg:z-10 ${
              showFilter
                ? " left-0 top-16 lg:-top-2 fixed"
                : "-left-[311px] lg:left-0"
            }`}
          >
            <div className="flex relative">
              <form>
                <div className="mb-6 w-72">
                  <label className="block mb-2 text-sm font-medium text-gray-700 ">
                    Price Range: {priceRange[0]} - {priceRange[1]}
                  </label>
                  <Slider
                    range
                    min={1000000}
                    max={100000000}
                    step={100000}
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    trackStyle={[{ backgroundColor: "red" }]}
                    handleStyle={[
                      { borderColor: "red" },
                      { borderColor: "red" },
                    ]}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <div className="grid grid-cols-2">
                    {sizeOptions.map((size) => (
                      <div key={size} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={size}
                          checked={selectedSizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                          className="mr-2"
                        />
                        <label>{size.replace("-", " - ")} sqft</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Number of Bedrooms
                  </label>
                  <div className="grid grid-cols-3">
                    {bedroomOptions.map((bed) => (
                      <div key={bed} className=" mb-2">
                        <input
                          type="checkbox"
                          id={bed}
                          checked={selectedBedrooms.includes(bed)}
                          onChange={() => handleBedroomChange(bed)}
                          className="mr-2 "
                        />
                        <label>{bed}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Number of Washroom
                  </label>
                  <div className="grid grid-cols-3">
                    {washroomOptions.map((washroom) => (
                      <div key={washroom} className=" mb-2">
                        <input
                          type="checkbox"
                          id={washroom}
                          checked={selectedWashroom.includes(washroom)}
                          onChange={() => handleWashroomChange(washroom)}
                          className="mr-2 "
                        />
                        <label>{washroom}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Number of Garages
                  </label>
                  <div className="grid grid-cols-3">
                    {garageOptions.map((garage) => (
                      <div key={garage} className=" mb-2">
                        <input
                          type="checkbox"
                          id={garage}
                          checked={selectedGarages.includes(garage)}
                          onChange={() =>
                            setSelectedGarages((prev) =>
                              prev.includes(garage)
                                ? prev.filter((g) => g !== garage)
                                : [...prev, garage]
                            )
                          }
                          className="mr-2"
                        />
                        <label>{garage}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
              <div>
                {showFilter ? (
                  <p
                    onClick={toggleFilter}
                    className="fixed top-16 left-72  text-white py-1 text-2xl hover:text-gray-400 cursor-pointer bg-[#00d7c0] pl-2 rounded-l-full  lg:hidden"
                  >
                    <FaArrowLeft />
                  </p>
                ) : (
                  <p
                    className="fixed top-20 left-2 text-gray-300 py-1 text-2xl hover:text-gray-400 cursor-pointer bg-[#00d7c0] pr-2 rounded-r-full  lg:hidden"
                    onClick={toggleFilter}
                  >
                    <FaArrowRight />
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full flex justify-end ">
          <div className="px-4 lg:max-w-6xl  w-full">
            <div className="flex flex-col items-center justify-center">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const requirement = e.target.req.value;
                  console.log(requirement.length);
                  if (requirement.length < 4) {
                    toast.error("Can't be empty");
                    return;
                  } else {
                    localStorage.setItem("userRequirement", requirement);
                    e.target.remove();
                    toast.success("Thanks, Submitted Successfully!");
                  }
                }}
                className="border rounded-full"
              >
                <input
                  className="max-w-72  py-2 border rounded-l-full px-4"
                  name="req"
                  placeholder="Give your requirements"
                  type="text"
                />
                <input
                  className="bg-[#00d7c0] px-2 py-[7px] rounded-r-full border mr-[1px] text-white cursor-pointer hover:bg-[#28857b] duration-300"
                  type="submit"
                  value={"Submit"}
                />
              </form>

              <div className="w-full flex justify-center pt-4">
                <form
                  onSubmit={handleSearch}
                  className="w-full max-w-72 lg:w-fit relative"
                >
                  <input
                    type="text"
                    value={searchTerm}
                    name="searchTerm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search your desired apartment"
                    className=" w-72 border focus:outline-none outline-accent rounded-full py-2 pl-4 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-accent absolute z-10 cursor-pointer hover:bg-[#4db6ac] right-[3px] top-[3px] flex items-center rounded-full gap-2 py-2 px-4 text-white"
                  >
                    <FaArrowCircleDown className="text-md" />
                  </button>
                </form>
              </div>
            </div>
            <h1 className="text-center text-xl text-gray-400 py-4">
              Showing Results for: {searchTerm || "All"}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 pb-4 w-full  lg:px-10 lg:w-fit mx-auto">
              {currentItems.length === 0 ? (
                <h2 className="text-center text-gray-400">
                  No apartments found matching your criteria.
                </h2>
              ) : (
                currentItems.map((a) => (
                  <Link
                    to={`/apartments/${a._id}`}
                    className="shadow-xl  rounded-2xl border md:w-80 w-full"
                  >
                    <img
                      className=" md:w-80 w-full h-48 rounded-t-2xl"
                      src={a?.thumbnails[0]}
                      alt={a?.title}
                    />
                    <div className="p-4">
                      <h1 className="text-sm font-semibold line-clamp-2">
                        {a?.title}
                      </h1>
                      <p className="flex gap-1 text-sm pt-2 h-12 text-gray-500">
                        <IoLocationOutline className="text-xl text-warning" />
                        <span>{a?.location}</span>
                      </p>
                      <div className="text-sm flex justify-between py-3 font-semibold text-gray-500">
                        <p className="flex items-center gap-2">
                          <FaBed /> {a?.bedroom}
                        </p>
                        <p className="flex items-center gap-2">
                          <GiBathtub /> {a?.washroom}
                        </p>
                        <p className="flex items-center gap-2">
                          <MdBalcony /> {a?.balcony}
                        </p>
                        <p className="flex items-center gap-2">
                          <MdOutlineGarage /> {a?.garages}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaRuler /> {a?.size} SqFt
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 ">
                          <img
                            className="w-8 mask mask-circle "
                            src={a?.soldBy?.photoURL}
                            alt=""
                          />
                          <p className="text-xs w-24 overflow-hidden">
                            {a?.soldBy?.name}
                          </p>
                        </div>
                        <p className="text-lg font-medium">
                          {Math.round(Number(a?.price)).toLocaleString("en-US")}{" "}
                          Tk
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center text-xs gap-4 my-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:bg-gray-100"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UserRequirement;
