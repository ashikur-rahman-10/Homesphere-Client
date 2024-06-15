import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseApartment from "../../Hooks/UseApartment";
import ApartmentCard from "../../Components/ApartmentCard/ApartmentCard";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft, FaArrowRight, FaMagnifyingGlass } from "react-icons/fa6";

const SearchPage = () => {
  const { searchTerm } = useParams();
  const { apartments } = UseApartment();
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([1000000, 100000000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [showFilter, setShowFilter] = useState(false); // State to toggle filter visibility

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

  // Filter apartments based on search term, price range, size, and bedrooms
  const searchResults = approvedApartments.filter(
    (a) =>
      a?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a?.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a?.keywords?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApartments = searchResults.filter((a) => {
    const matchesSearchTerm =
      !searchTerm ||
      a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

    return matchesSearchTerm && matchesPrice && matchesSize && matchesBedroom;
  });

  // Handle search submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const keyword = event.target.keyword.value;
    if (keyword.length >= 3) {
      navigate(`/search/${keyword}`);
    } else {
      toast.error("Write your desired location!");
    }
  };

  // Toggle filter visibility
  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
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
    <div className="w-full mx-auto min-h-screen pt-16">
      <div className="flex flex-col lg:flex-row relative">
        {/* Side Filter Menu */}
        <div
          className={`bg-gray-200 lg:w-80 w-fit h-[91vh] p-4 absolute lg:relative duration-500 z-40 lg:z-10 ${
            showFilter ? "absolute left-0 " : "-left-[311px] lg:left-0"
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
                  handleStyle={[{ borderColor: "red" }, { borderColor: "red" }]}
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Size
                </label>
                {sizeOptions.map((size) => (
                  <div key={size} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={size}
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                      className="mr-2"
                    />
                    <label htmlFor={size}>
                      {size.replace("-", " - ")} sqft
                    </label>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Number of Bedrooms
                </label>
                {bedroomOptions.map((bed) => (
                  <div key={bed} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={bed}
                      checked={selectedBedrooms.includes(bed)}
                      onChange={() => handleBedroomChange(bed)}
                      className="mr-2"
                    />
                    <label htmlFor={bed}>{bed}</label>
                  </div>
                ))}
              </div>
            </form>
            <div>
              {showFilter ? (
                <p
                  onClick={toggleFilter}
                  className="fixed top-16 left-72  text-white py-1 text-2xl hover:text-black cursor-pointer bg-slate-200 pr-2 rounded-r-full  lg:hidden"
                >
                  <FaArrowLeft />
                </p>
              ) : (
                <p
                  className="fixed top-20 left-2 text-gray-300 py-1 text-2xl hover:text-black cursor-pointer bg-slate-200 pr-2 rounded-r-full  lg:hidden"
                  onClick={toggleFilter}
                >
                  <FaArrowRight />
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 w-full">
          <div className="w-full flex justify-center pt-4">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-80 lg:w-fit relative"
            >
              <input
                type="text"
                name="keyword"
                placeholder="Search your desired apartment"
                className=" w-80 border focus:outline-none outline-accent rounded-full py-2 pl-4 text-sm"
              />
              <button
                type="submit"
                className="bg-accent absolute z-10 cursor-pointer hover:bg-[#4db6ac] right-[3px] top-[3px] flex items-center rounded-full gap-2 py-2 px-4 text-white"
              >
                <FaMagnifyingGlass />
              </button>
            </form>
          </div>
          <h1 className="text-center text-xl text-gray-400 py-4">
            Showing Results for: {searchTerm ? searchTerm : "All"}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 w-full lg:w-fit mx-auto">
            {filteredApartments.map((a) => (
              <ApartmentCard key={a._id} apartment={a} />
            ))}
          </div>
        </div>
      </div>

      {/* Filter Toggle Button for Mobile/Tablet */}
      {/* {!showFilter && (
        <button
          className="fixed top-20 left-4 bg-accent text-white px-4 py-2 rounded-lg shadow-lg lg:hidden"
          onClick={toggleFilter}
        >
          <FaArrowRight />
        </button>
      )} */}

      <Toaster />
    </div>
  );
};

export default SearchPage;
