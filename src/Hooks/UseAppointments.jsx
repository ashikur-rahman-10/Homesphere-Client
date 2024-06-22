import React from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseAppointments = () => {
  const [axiosSecure] = UseAxiosSecure();

  // Get appointments
  const { data: appointments = [], refetch: appointmentsRefetch } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appointments`);
      return res.data;
    },
  });

  return { appointments, appointmentsRefetch };
};

export default UseAppointments;
