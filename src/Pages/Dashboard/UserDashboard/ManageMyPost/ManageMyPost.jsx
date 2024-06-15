import React, { useState, useEffect } from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/UseAuth";
import { FaTrashAlt, FaArrowRight, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { FaBed, FaRuler } from "react-icons/fa6";
import { GiBathtub } from "react-icons/gi";
import { MdBalcony, MdOutlineGarage } from "react-icons/md";
import CustomLoader from "../../../../Components/CustomLoader/CustomLoader";

const ManageMyPost = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const [editingPost, setEditingPost] = useState(null);
  const [sortOption, setSortOption] = useState("date_desc");
  const [filterStatus, setFilterStatus] = useState("all");
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

  // Get userApartments
  const {
    data: userApartments = [],
    refetch: userApartmentsRefetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userApartments", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/apartments/email/${email}`);
      return res.data;
    },
    enabled: !!email, // Ensure query runs only if email exists
  });

  // Handle status change
  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/apartments/${id}`, { postStatus: status });
      userApartmentsRefetch();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/apartments/${id}`);
          userApartmentsRefetch();
          toast.success("Deleted Successfully!");
        } catch (error) {
          console.error("Error deleting:", error);
        }
      }
    });
  };

  // Handle edit
  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      details: post.details,
      bedroom: post.bedroom,
      washroom: post.washroom,
      garages: post.garages,
      size: post.size,
      location: post.location,
      price: post.price,
      keywords: post.keywords,
      balcony: post.balcony,
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
          userApartmentsRefetch();
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
      postedIn: "",
      impression: "",
      balcony: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-500";
      case "sold":
        return "bg-red-100 text-red-600";
      default:
        return "";
    }
  };

  // Format price
  const formatPrice = (price) => {
    return Number(price).toLocaleString();
  };

  // Sort apartments
  const sortedApartments = [...userApartments].sort((a, b) => {
    if (sortOption === "date_asc") {
      return new Date(a.postedIn) - new Date(b.postedIn);
    } else if (sortOption === "date_desc") {
      return new Date(b.postedIn) - new Date(a.postedIn);
    } else if (sortOption === "price_asc") {
      return a.price - b.price;
    } else if (sortOption === "price_desc") {
      return b.price - a.price;
    }
    return 0;
  });

  // Filter apartments
  const filteredApartments = sortedApartments.filter((a) => {
    if (filterStatus === "all") return true;
    return a.postStatus === filterStatus;
  });

  if (isLoading) {
    return <CustomLoader />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="max-w-7xl px-4 min-h-screen py-14 mx-auto">
      <h1 className="text-2xl text-center text-gray-500 py-4">
        Manage My Post
      </h1>
      <div className="flex justify-between items-center mb-4">
        <select
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
          className="border py-1 px-2 text-xs rounded-md"
        >
          <option value="date_desc">Sort by Date (Descending)</option>
          <option value="date_asc">Sort by Date (Ascending)</option>
          <option value="price_desc">Sort by Price (Descending)</option>
          <option value="price_asc">Sort by Price (Ascending)</option>
        </select>
        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus}
          className="border py-1 px-2 text-xs rounded-md"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="sold">Sold</option>
        </select>
      </div>
      <div className="w-fit grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto pb-20">
        {filteredApartments.map((a) => (
          <div key={a._id}>
            <div className="w-96 md:w-72 shadow-lg bg-white rounded-2xl">
              <img
                className="w-96 md:w-72 rounded-t-2xl h-44"
                src={a.thumbnails[0]}
                alt={a.title}
              />
              <div className="p-4 space-y-2 text-sm">
                <p className="line-clamp-2 h-10">{a.title}</p>
                <div className="flex justify-between items-center">
                  <p
                    className={`py-1 px-2 text-xs border rounded-md ${getStatusClass(
                      a.postStatus
                    )}`}
                  >
                    {" "}
                    {a.postStatus}
                  </p>

                  <button
                    onClick={() => handleDelete(a._id)}
                    className="bg-red-50 border border-white hover:border-red-400 hover:bg-red-400 hover:text-white text-red-400 rounded-full p-2"
                  >
                    <FaTrashAlt className="text-lg" />
                  </button>

                  <Link
                    to={`/apartments/${a._id}`}
                    className="text-xs bg-accent text-white rounded-xl px-2 py-1 hover:bg-blue-500 flex items-center gap-1"
                  >
                    View Details <FaArrowRight />
                  </Link>
                </div>

                <div className="text-sm flex justify-between py-3 font-semibold text-gray-500">
                  <p className="flex items-center gap-2">
                    <FaBed /> {a.bedroom}
                  </p>
                  <p className="flex items-center gap-2">
                    <GiBathtub /> {a.washroom}
                  </p>
                  <p className="flex items-center gap-2">
                    <MdBalcony /> {a.balcony}
                  </p>
                  <p className="flex items-center gap-2">
                    <MdOutlineGarage /> {a.garages}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaRuler /> {a.size} SqFt
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleEdit(a)}
                    className="bg-yellow-50 border border-white hover:border-yellow-400 hover:bg-yellow-400 hover:text-white text-yellow-400 rounded-full py-1 px-2 flex items-center gap-2"
                  >
                    Edit <FaPen className="text-lg" />
                  </button>
                  <p className="text-base font-medium">
                    {formatPrice(a.price)} Tk
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
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

export default ManageMyPost;
