import React from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/UseAuth";
import ApartmentCard from "../../../../Components/ApartmentCard/ApartmentCard"; // Assuming you have this component
import { Link } from "react-router-dom";
import { FaArrowRight, FaBed, FaRuler } from "react-icons/fa6";
import { GiBathtub } from "react-icons/gi";
import { MdBalcony, MdOutlineGarage } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const MySavedPost = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { user } = useAuth();
  const email = user.email;

  // Get favorites
  const { data: favorites = [], refetch: favoritesRefetch } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${email}`);
      return res.data;
    },
  });

  // Get apartments
  const { data: apartments = [], refetch: apartmentsRefetch } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/apartments`);
      return res.data;
    },
  });

  // Filter favorite apartments
  const favApartments = apartments.filter((apartment) =>
    favorites.some((fav) => fav.apartmentId == apartment._id)
  );

  const handleDelete = async (id) => {
    const myFav = favorites.find((f) => f.apartmentId == id);
    const favId = myFav._id;
    try {
      await axiosSecure.delete(`/favorites/${favId}`);
      favoritesRefetch();
      toast.success("Removed Successfully!");
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="min-h-screen py-16">
      <h1 className="text-center text-2xl font-bold py-4">My Saved Posts</h1>
      <div className=" px-4 space-y-4">
        {favApartments.length > 0 ? (
          favApartments.map((apartment) => (
            <div
              key={apartment._id}
              className="flex gap-4 border rounded-xl shadow-md pr-4 max-w-2xl mx-auto "
            >
              <img
                className="w-28 md:w-44 rounded-l-xl object-cover"
                src={apartment.thumbnails[0]}
                alt={apartment.title}
              />
              <div className="flex flex-col justify-between py-2 space-y-2 w-full">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {apartment.title}
                </h3>
                <p className="flex gap-1 text-xs  text-gray-500">
                  <IoLocationOutline className="text-xl text-warning" />
                  <span>{apartment.location}</span>
                </p>
                <div className="text-xs flex justify-evenly  font-semibold text-gray-500">
                  <p className="flex items-center gap-2">
                    <FaBed /> {apartment.bedroom}
                  </p>
                  <p className="flex items-center gap-2">
                    <GiBathtub /> {apartment.washroom}
                  </p>
                  <p className="flex items-center gap-2">
                    <MdBalcony /> {apartment.balcony}
                  </p>
                  <p className="flex items-center gap-2">
                    <MdOutlineGarage /> {apartment.garages}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaRuler /> {apartment.size} SqFt
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDelete(apartment._id)}
                    className="bg-red-50 border w-fit border-white hover:border-red-400 hover:bg-red-400 hover:text-white text-red-400 rounded-full p-2"
                  >
                    <FaTrashAlt className="text-lg" />
                  </button>

                  <div className="pt-2 flex items-center gap-5">
                    <Link
                      to={`/apartments/${apartment._id}`}
                      className="bg-blue-50 border border-white hover:border-blue-400 hover:bg-blue-400 hover:text-white text-blue-400 rounded-full py-1 px-2 text-xs items-center flex gap-2"
                    >
                      Details <FaArrowRight className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No saved posts found.</p>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default MySavedPost;
