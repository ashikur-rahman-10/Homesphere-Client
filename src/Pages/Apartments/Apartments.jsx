import React from "react";
import UseApartment from "../../Hooks/UseApartment";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import ApartmentCard from "../../Components/ApartmentCard/ApartmentCard";

const Apartments = () => {
  const { apartments, apartmentsRefetch } = UseApartment();

  if (!apartments) {
    return <CustomLoader />;
  }

  return (
    <div className="pt-16 px-4 max-w-6xl mx-auto w-full">
      <h1 className="text-center text-2xl text-gray-500 py-6">Apartments</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 w-fit mx-auto">
        {apartments.map((a) => (
          <ApartmentCard key={a._id} apartment={a} />
        ))}
      </div>
    </div>
  );
};

export default Apartments;
