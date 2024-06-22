import React, { useState, useEffect } from "react";
import UseAppointments from "../../../../Hooks/UseAppointments";
import CustomLoader from "../../../../Components/CustomLoader/CustomLoader";
import UseApartment from "../../../../Hooks/UseApartment";
import { FaArrowRight, FaBed, FaEnvelope, FaRuler } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  FcBusinessman,
  FcOvertime,
  FcPhone,
  FcClock,
  FcRuler,
} from "react-icons/fc";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const ManageAppointments = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { appointments, appointmentsRefetch } = UseAppointments();
  const { apartments, apartmentsRefetch } = UseApartment();

  const handleStatusChange = async (appointmentId, newStatus) => {
    const update = { appointmentStatus: newStatus };
    try {
      const response = await axiosSecure.patch(
        `/appointments/${appointmentId}`,
        update
      );
      if (response.data.acknowledged) {
        await appointmentsRefetch();
        Swal.fire({
          icon: "success",
          title: `Appointment status ${newStatus}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (appointments) {
      filterAndSortAppointments(appointments, statusFilter, sortOrder);
    }
  }, [appointments, statusFilter, sortOrder]);

  const filterAndSortAppointments = (appointments, status, order) => {
    let filtered = [...appointments];
    if (status !== "All") {
      filtered = filtered.filter((a) => a.appointmentStatus === status);
    }
    filtered.sort((a, b) => {
      const dateTimeA = new Date(`${a.date} ${a.timeSlot}`);
      const dateTimeB = new Date(`${b.date} ${b.timeSlot}`);
      return order === "asc" ? dateTimeA - dateTimeB : dateTimeB - dateTimeA;
    });
    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Visited":
        return "text-green-400 bg-green-50";
      case "To Visited":
        return "text-blue-500 bg-blue-50";
      case "Expired":
        return "text-red-400 bg-red-50";
      default:
        return "";
    }
  };

  if (!appointments || !apartments) {
    return <CustomLoader />;
  }

  return (
    <div className="pb-6">
      <h1 className="text-gray-500 text-center text-2xl py-6">Appointments</h1>
      <div className="flex justify-end space-x-4 mb-4 px-4">
        <select
          className="px-2 py-1 text-sm border rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="All">All</option>
          <option value="To Visited">To Visited</option>
          <option value="Visited">Visited</option>
          <option value="Expired">Expired</option>
        </select>
        {/* <select
          className="p-2 border rounded"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select> */}
      </div>
      <div className="space-y-4">
        {filteredAppointments.map((a) => {
          const bookedApartment = apartments.find(
            (apartment) => apartment._id === a.bookingsFor
          );
          return (
            <div
              key={a._id}
              className="w-fit mx-auto border rounded-2xl shadow-md"
            >
              <div className="p-4">
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <FcBusinessman className="text-xl" /> {a.name}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <FaEnvelope className="text-md" /> {a.email}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <FcPhone className="text-md" /> {a.contactNumber}
                </p>
                <p className="flex items-center gap-2 text-sm text-yellow-400">
                  <FcOvertime className="text-lg" /> {a.date}
                </p>
                <div className="flex w-full justify-between pr-6">
                  <p className="flex items-center gap-2 text-sm text-blue-500">
                    <FcClock className="text-md" /> {a.timeSlot}
                  </p>
                  <div className="flex items-center gap-2">
                    <select
                      className={`py-1 text-xs border rounded-md ${getStatusClass(
                        a.appointmentStatus
                      )}`}
                      value={a.appointmentStatus}
                      onChange={(e) =>
                        handleStatusChange(a._id, e.target.value)
                      }
                    >
                      <option value="To Visited">To Visited</option>
                      <option value="Visited">Visited</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </div>
                </div>
              </div>
              {bookedApartment && (
                <div className="flex gap-2 w-[380px] md:w-[600px] mx-auto rounded-b-2xl">
                  <div className="w-32 md:w-44">
                    <img
                      className="w-32 md:44 h-24 mask rounded-bl-2xl"
                      src={bookedApartment.thumbnails[0]}
                      alt=""
                    />
                  </div>
                  <div className="w-full pr-2 space-y-1">
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {bookedApartment.title}
                    </h3>
                    <p className="flex gap-1 text-xs text-gray-500">
                      <IoLocationOutline className="text-xl text-warning" />
                      <span>{bookedApartment.location}</span>
                    </p>
                    <div className="text-xs flex justify-evenly w-full font-semibold text-gray-500">
                      <p className="flex items-center gap-2">
                        <FaBed className="text-xl text-orange-300" />{" "}
                        {bookedApartment.bedroom}
                      </p>
                      <p className="flex items-center gap-2">
                        <FcRuler className="text-xl" /> {bookedApartment.size}{" "}
                        SqFt
                      </p>
                      <Link
                        to={`/apartments/${bookedApartment._id}`}
                        className="flex items-center gap-2 text-white bg-blue-600 px-2 py-1 rounded-full font-medium hover:bg-blue-400"
                      >
                        Details <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageAppointments;
