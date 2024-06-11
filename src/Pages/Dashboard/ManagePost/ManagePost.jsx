import React, { useState } from "react";
import UseApartment from "../../../Hooks/UseApartment";
import { Link } from "react-router-dom";
import { FaBed, FaRuler } from "react-icons/fa";
import { GiBathtub } from "react-icons/gi";
import { MdBalcony, MdOutlineGarage } from "react-icons/md";

const ManagePost = () => {
  const { apartments, apartmentsRefetch } = UseApartment();
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
    }).format(price);
  };

  return (
    <div>
      <h1 className="text-center text-2xl py-6">Manage Post</h1>

      <div className="flex justify-between items-center mb-4">
        <select
          onChange={handleFilterChange}
          value={filterStatus}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>

        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="p-2 border rounded"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="w-fit grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto pb-20">
        {sortedApartments.map((a) => (
          <Link to={`/apartments/${a._id}`} key={a._id}>
            <div className="w-96 md:w-72 shadow-lg bg-white rounded-2xl ">
              <img
                className="w-96 md:w-72 rounded-t-2xl h-44"
                src={a.thumbnails[0]}
                alt={a.title}
              />
              <div className="p-4 space-y-2 text-sm">
                <p className="line-clamp-2 h-10">{a.title}</p>
                <p className="text-xs badge">{a?.postStatus}</p>

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
                    <p className="text-xs w-24 overflow-hidden">
                      {a?.soldBy?.name}
                    </p>
                  </div>
                  <p className="text-lg font-medium">{formatPrice(a.price)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ManagePost;
