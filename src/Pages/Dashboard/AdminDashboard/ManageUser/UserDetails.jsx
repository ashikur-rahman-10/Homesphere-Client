import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import CustomLoader from "../../../../Components/CustomLoader/CustomLoader";
import { FaLocationArrow, FaLocationDot, FaLocationPin } from "react-icons/fa6";

const UserDetails = () => {
  const { email } = useParams();
  const [axiosSecure] = UseAxiosSecure();

  // Get user details
  const {
    data: user = {},
    isLoading: userLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
  });

  // Get apartments posted by user
  const {
    data: apartments = [],
    isLoading: apartmentsLoading,
    refetch: apartmentsRefetch,
  } = useQuery({
    queryKey: ["apartments", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/apartments/email/${email}`);
      return res.data;
    },
  });

  // Fetch data on component mount
  useEffect(() => {
    userRefetch();
    apartmentsRefetch();
  }, [userRefetch, apartmentsRefetch]);

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (userLoading || apartmentsLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center mx-auto p-6 pb-16">
      {/* User Details */}
      <div className="flex flex-col items-center pt-20 mb-6 space-y-4 md:flex-row md:space-y-0 md:space-x-6">
        <img
          src={user?.photoURL}
          alt={user?.name}
          className="w-32 mask mask-circle border rounded-full"
        />
        <div>
          <p className="text-sm">
            <strong>Name:</strong> {user?.name}
          </p>
          <p className="text-sm">
            <strong>Email:</strong> {user?.email}
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> {user?.phone}
          </p>
          <p className="text-sm">
            <strong>NID Number:</strong> {user?.nidNumber}
          </p>
          <p className="text-sm">
            <strong>Address:</strong> {user?.address}
          </p>
          <p className="text-sm">
            <strong>Zipcode:</strong> {user?.zipcode}
          </p>
        </div>
      </div>

      {/* Apartments Posted by User */}
      <div className="w-full">
        <h1 className="text-center font-medium  mb-6 text-gray-500">
          Apartments Posted by: {user?.name}
        </h1>
        {apartments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apartments.map((apartment) => (
              <Link to={`/apartments/${apartment._id}`} key={apartment._id}>
                <div className="flex items-center gap-2 border rounded-lg shadow-lg pr-2 h-28">
                  <img
                    src={apartment?.thumbnails?.[0]}
                    alt={apartment?.title}
                    className="w-32 h-28 rounded-l-lg object-cover"
                  />
                  <div className="h-full flex flex-col justify-between py-2">
                    <h2 className="text-[15px] font-medium mt-2 line-clamp-2">
                      {apartment?.title}
                    </h2>
                    <p className="flex items-center gap-2 text-sm text-gray-500">
                      <FaLocationDot className="text-yellow-500" />{" "}
                      {apartment?.location}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No apartments posted by this user.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
