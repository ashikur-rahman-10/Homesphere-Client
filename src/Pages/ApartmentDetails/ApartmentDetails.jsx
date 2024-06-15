import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import {
  FaBed,
  FaHammer,
  FaHeart,
  FaLocationDot,
  FaPen,
  FaRuler,
} from "react-icons/fa6";
import { GiBathtub } from "react-icons/gi";
import { MdBalcony, MdOutlineGarage } from "react-icons/md";
import { FaCalendarCheck, FaCarAlt, FaRegCalendarAlt } from "react-icons/fa";
import useAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import toast, { Toaster } from "react-hot-toast";
import UseAdmin from "../../Hooks/UseAdmin";

const ApartmentDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { admin } = UseAdmin();
  const [axiosSecure] = UseAxiosSecure();
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    bedroom: "",
    washroom: "",
    garages: "",
    size: "",
    location: "",
    price: "",
    keywords: "",
    balcony: "",
  });

  // Get apartment data
  const { data: apartment = {}, refetch: apartmentRefetch } = useQuery({
    queryKey: ["apartment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/apartments/${id}`);
      return res.data;
    },
  });

  // Get apartment favorites of user
  const { data: favorites = {}, refetch: favoritesRefetch } = useQuery({
    queryKey: ["favorites", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user?.email}`);
      return res.data;
    },
  });

  const formatPrice = (price) => {
    return Math.round(Number(price)).toLocaleString("en-US");
  };

  const findFav = Array.isArray(favorites)
    ? favorites.find((f) => f.apartmentId === id)
    : null;

  const hanedleFavorite = (id) => {
    const favoriteApartment = {
      apartmentId: id,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    axiosSecure.post(`/favorites`, favoriteApartment).then((response) => {
      if (response.data.acknowledged) {
        toast.success("Added to favorites!");
        favoritesRefetch();
      }
    });
  };

  const handleEdit = (apartment) => {
    setEditingPost(apartment);
    setFormData({
      title: apartment.title,
      details: apartment.details,
      bedroom: apartment.bedroom,
      washroom: apartment.washroom,
      garages: apartment.garages,
      size: apartment.size,
      location: apartment.location,
      price: apartment.price,
      keywords: apartment.keywords,
      balcony: apartment.balcony,
    });
  };

  const handleSave = async () => {
    if (editingPost) {
      try {
        const response = await axiosSecure.patch(
          `/apartments/${editingPost._id}`,
          {
            ...editingPost,
            ...formData,
          }
        );

        if (response.data.modifiedCount > 0) {
          apartmentRefetch();
          setEditingPost(null);
          Swal.fire({
            title: "Success",
            text: "Post updated successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      details: "",
      bedroom: "",
      washroom: "",
      garages: "",
      size: "",
      location: "",
      price: "",
      keywords: "",
      balcony: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    balcony,
    buildYear,
  } = apartment;

  if (!favorites) {
    return <CustomLoader />;
  }

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="py-10 lg:px-36 px-2">
      <div className="w-full flex flex-col md:flex-row justify-between pt-10">
        <div className="apartment-details h-[500px] w-full md:max-w-[48%]">
          {thumbnails.length > 0 ? (
            <Carousel
              showArrows={true}
              onChange={() => {}}
              onClickItem={() => {}}
              onClickThumb={() => {}}
              autoPlay={true}
            >
              {thumbnails.map((thumbnail, index) => (
                <div key={index} className="flex justify-center">
                  <img
                    className="mg:max-h-96 max-h-80 rounded-md"
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
            <FaLocationDot />
            {location}
          </p>
          <h3 className="text-xl pt-10">Features:</h3>
          <div className="md:text-base text-sm grid grid-cols-3 gap-5 py-3 font-medium text-gray-400">
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
              <MdBalcony className="text-3xl text-red-400" />
              <p className="flex flex-col">
                Balcony: <span className="text-black">{balcony}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineGarage className="text-3xl text-red-400" />
              <p className="flex flex-col">
                Garages:
                <span className="text-black flex items-center gap-1">
                  {garages}
                  <FaCarAlt className="text-gray-700" />
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaRuler className="text-3xl text-red-400" />
              <p className="flex flex-col">
                Size: <span className="text-black"> {size} SqFt</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaHammer className="text-3xl text-red-400" />
              <p className="flex flex-col">
                Year Built: <span className="text-black"> {buildYear}</span>
              </p>
            </div>
          </div>
          {admin ? (
            <button
              onClick={() => {
                handleEdit(apartment);
              }}
              className="flex items-center gap-2 text-xs md:text-sm bg-yellow-50 px-4 py-2 rounded-md text-yellow-400 uppercase outline outline-yellow-100 hover:bg-yellow-400 hover:text-white duration-700 my-5 cursor-pointer"
            >
              <FaPen /> Edit
            </button>
          ) : (
            <div className="py-6 w-full flex gap-10">
              {!findFav && (
                <button
                  onClick={() => {
                    hanedleFavorite(`${_id}`);
                  }}
                  disabled={findFav} // Disable the button if findFav exists
                  className="flex items-center gap-2 text-xs md:text-sm bg-red-50 px-4 py-1 rounded-md text-red-400 uppercase outline outline-red-100 hover:bg-red-400 hover:text-white duration-500"
                >
                  <FaHeart /> Save
                </button>
              )}

              <Link
                to={`/get-appointment/${_id}`}
                className="flex items-center gap-2 text-xs md:text-sm bg-yellow-50 px-4 py-1 rounded-md text-yellow-400 uppercase outline outline-yellow-100 hover:bg-yellow-400 hover:text-white duration-500"
              >
                <FaRegCalendarAlt /> Book Appointment
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="pb-16">
        <p className="text-xl pb-4">
          BDT<span className="text-3xl"> {formatPrice(price)} </span>
        </p>
        <p className="text-[#757575]">{details}</p>
        <img className="pt-10 w-full px-4" src={floorPlan} alt="" />
      </div>
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center md:pt-6  justify-center overflow-y-auto">
          <div className="bg-white p-6 rounded-md shadow-lg space-y-4 max-w-xl w-full max-h-[850px] md:max-w-[700px] lg:max-w-3xl overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Post</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-gray-600 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full md:w-80 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Title"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="details"
                  className="text-sm font-semibold text-gray-600 mb-1"
                >
                  Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full md:w-80 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-32 resize-none"
                  placeholder="Details"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="bedroom"
                  className="text-sm font-semibold text-gray-600 mb-1"
                >
                  Bedrooms
                </label>
                <input
                  type="text"
                  id="bedroom"
                  name="bedroom"
                  value={formData.bedroom}
                  onChange={handleChange}
                  className="w-full md:w-80 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Bedrooms"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="washroom"
                  className="text-sm font-semibold text-gray-600 mb-1"
                >
                  Washrooms
                </label>
                <input
                  type="text"
                  id="washroom"
                  name="washroom"
                  value={formData.washroom}
                  onChange={handleChange}
                  className="w-full md:w-80 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Washrooms"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="garages"
                  className="text-sm font-semibold text-gray-600 mb-1"
                >
                  Garages
                </label>
                <input
                  type="text"
                  id="garages"
                  name="garages"
                  value={formData.garages}
                  onChange={handleChange}
                  className="w-full md:w-80 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Garages"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="size"
                  className="text-sm font-semibold text-gray-600 mb-1"
                >
                  Size (SqFt)
                </label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full md:w-80 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Size (SqFt)"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="location"
                  className="text-sm font-semibold text-gray-600 mb-1"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full md:w-80 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Location"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="price"
                  className="text-sm font-semibold text-gray-600 mb-1"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full md:w-80 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Price"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="keywords"
                  className="text-sm font-semibold text-gray-600 mb-1"
                >
                  Keywords
                </label>
                <input
                  type="text"
                  id="keywords"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  className="w-full md:w-80 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Keywords"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="balcony"
                  className="text-sm font-semibold text-gray-600 mb-1"
                >
                  Balcony
                </label>
                <input
                  type="text"
                  id="balcony"
                  name="balcony"
                  value={formData.balcony}
                  onChange={handleChange}
                  className="w-full md:w-80 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Balcony"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 hover:text-gray-900 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default ApartmentDetails;
