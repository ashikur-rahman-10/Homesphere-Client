import React, { useState } from "react";
import UseApartment from "../../../../Hooks/UseApartment";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBed, FaRuler, FaTrashAlt } from "react-icons/fa";
import { GiBathtub } from "react-icons/gi";
import { MdBalcony, MdOutlineGarage } from "react-icons/md";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const ManagePost = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { apartments, apartmentsRefetch } = UseApartment();
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleStatusChange = (id, newStatus) => {
    const update = {
      postStatus: newStatus,
    };
    axiosSecure.patch(`/apartments/${id}`, update).then((response) => {
      if (response.data.acknowledged) {
        Swal.fire({
          icon: "success",
          title: `Post status ${newStatus}`,
          showConfirmButton: false,
          timer: 1500,
        });
        apartmentsRefetch();
      }
    });
  };

  const filteredApartments = apartments.filter(
    (a) => filterStatus === "all" || a.postStatus === filterStatus
  );

  const sortedApartments = filteredApartments.sort((a, b) =>
    sortOrder === "asc"
      ? Number(a.price) - Number(b.price)
      : Number(b.price) - Number(a.price)
  );

  const formatPrice = (price) => {
    return Math.round(Number(price)).toLocaleString("en-US");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/apartments/${id}`).then((response) => {
          if (response.data.acknowledged) {
            Swal.fire({
              icon: "success",
              title: `Deleted Successfully`,
              showConfirmButton: false,
              timer: 1500,
            });
            apartmentsRefetch();
          }
        });
      }
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "text-green-400";
      case "pending":
        return "text-blue-500";
      case "sold":
        return "text-red-400";
      default:
        return "";
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl py-6">Manage Post</h1>

      <div className="flex justify-between items-center mb-4">
        <select
          onChange={handleFilterChange}
          value={filterStatus}
          className="py-1 px-2 text-xs border rounded-md"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="sold">Sold</option>
        </select>

        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="py-1 px-2 text-xs border rounded-md"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="w-fit grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto pb-20">
        {sortedApartments.map((a) => (
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
                  <select
                    onChange={(e) => handleStatusChange(a._id, e.target.value)}
                    value={a.postStatus}
                    className={`py-1 text-xs border rounded-md ${getStatusClass(
                      a.postStatus
                    )}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="sold">Sold</option>
                  </select>

                  <button
                    onClick={() => {
                      handleDelete(a._id);
                    }}
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
                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 rounded-full"
                      src={a?.soldBy?.photoURL}
                      alt=""
                    />
                    <p className="text-xs w-24 line-clamp-2">
                      {a?.soldBy?.name}
                    </p>
                  </div>
                  <p className="text-base font-medium">
                    {formatPrice(a.price)} Tk
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePost;
