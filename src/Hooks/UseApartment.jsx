import React from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseApartment = () => {
  const [axiosSecure] = UseAxiosSecure();

  // Get apartments
  const { data: apartments = [], refetch: apartmentsRefetch } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/apartments`);
      return res.data;
    },
  });
  return { apartments, apartmentsRefetch };
};

export default UseApartment;
