import React from "react";
import UseApartment from "../../../Hooks/UseApartment";
import ApartmentCard from "../../../Components/ApartmentCard/ApartmentCard";

const ApartmentSection = () => {
  const { apartments } = UseApartment();

  return (
    <div className="max-w-6xl w-full mx-auto px-4 pb-20">
      <h1 className="text-center py-10 text-3xl">Apartments</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-fit mx-auto">
        {apartments.map((a) => (
          <ApartmentCard key={a._id} apartment={a}></ApartmentCard>
        ))}
      </div>
    </div>
  );
};

export default ApartmentSection;
