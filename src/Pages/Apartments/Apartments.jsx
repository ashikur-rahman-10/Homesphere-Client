import React, { useState } from "react";
import UseApartment from "../../Hooks/UseApartment";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import ApartmentCard from "../../Components/ApartmentCard/ApartmentCard";

const Apartments = () => {
  const { apartments, apartmentsRefetch } = UseApartment();
  const [sortOrder, setSortOrder] = useState("asc");

  const approvedPost = apartments.filter((a) => a?.postStatus === "approved");

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedApartments = approvedPost.sort((a, b) =>
    sortOrder === "asc"
      ? Number(a.price) - Number(b.price)
      : Number(b.price) - Number(a.price)
  );

  if (!apartments) {
    return <CustomLoader />;
  }

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="pt-16 px-4 max-w-6xl mx-auto w-full">
      <h1 className="text-center text-2xl text-gray-500 py-6">Apartments</h1>

      <div className="flex justify-end mb-4">
        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="py-1 px-2 text-xs border rounded-md"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 w-fit mx-auto">
        {sortedApartments.map((a) => (
          <ApartmentCard key={a._id} apartment={a} />
        ))}
      </div>
    </div>
  );
};

export default Apartments;
