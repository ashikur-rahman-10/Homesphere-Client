import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useThisUser from "../../Hooks/UseThisUser";
import { useNavigate, useParams } from "react-router-dom";

const GetAppointment = () => {
  const { id } = useParams();

  const { register, handleSubmit, reset } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
  const { thisUser } = useThisUser();

  const navigate = useNavigate();

  const dates = [
    new Date(Date.now() + 86400000), // Tomorrow
    new Date(Date.now() + 86400000 * 2), // Day after tomorrow
    new Date(Date.now() + 86400000 * 3),
    new Date(Date.now() + 86400000 * 4),
  ];

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:01 AM - 1:00 PM",
    "1:01 PM - 3:00 PM",
    "3:01 PM - 5:00 PM",
    "5:01 PM - 7:00 PM",
  ];

  useEffect(() => {
    fetchBookedTimeSlots();
  }, [selectedDate]);

  const fetchBookedTimeSlots = () => {
    fetch(
      `https://abacus-realty-server.vercel.app/appointments/booked-time-slots?date=${
        selectedDate.toISOString().split("T")[0]
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setBookedTimeSlots(data);
      });
  };

  const onSubmit = async (data) => {
    if (!selectedDate || !selectedTimeSlot) {
      Swal.fire({
        icon: "error",
        title: "Please select a date and time slot",
        timer: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    const appointment = {
      name: thisUser.name,
      contactNumber: thisUser.phone,
      email: thisUser.email,
      date: selectedDate.toDateString(),
      timeSlot: selectedTimeSlot,
      bookingsFor: id,
      appointmentStatus: "To Visited",
    };

    try {
      const response = await fetch(
        "https://abacus-realty-server.vercel.app/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointment),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Appointment booked successfully!",
          showConfirmButton: false,
          timer: 3000,
        });
        reset();
        navigate(`/apartments/${id}`);
        setSelectedTimeSlot(null);
      } else {
        const errorResponse = await response.json();
        console.error("Server response:", errorResponse);
        throw new Error("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        text: error.message,
        timer: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTimeSlotBooked = (timeSlot) => {
    return bookedTimeSlots.includes(timeSlot);
  };

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div
      className="flex items-center justify-center min-h-[100vh]
      w-full px-4 py-1 text-xs pt-16 z-0"
    >
      <form
        className="w-full max-w-md border px-6 py-12 rounded-xl shadow-md space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl text-center text-gray-500 pb-5">
          Schedule Viewing
        </h1>

        <div className="w-full">
          <label className="block mb-2 text-gray-700">Select Date*</label>
          <div className="flex items-center justify-between space-x-2">
            {dates.map((date, index) => (
              <button
                key={index}
                type="button"
                className={`px-4 py-2 rounded-lg ${
                  selectedDate.toDateString() === date.toDateString()
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="text-lg">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className="text-sm">
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full">
          <label className="block mb-2 text-gray-700">Select Time Slot*</label>
          <div className="flex items-center justify-between space-x-2">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                type="button"
                className={`px-1 py-2 rounded-lg ${
                  isTimeSlotBooked(slot)
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : selectedTimeSlot === slot
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 hover:bg-green-600 hover:text-white"
                }`}
                onClick={() => {
                  if (!isTimeSlotBooked(slot)) {
                    setSelectedTimeSlot(slot);
                  }
                }}
                disabled={isTimeSlotBooked(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex items-center justify-center text-center">
          <input
            className="border border-accent rounded-full px-4 py-2 w-full text-white bg-green-600 hover:bg-white hover:text-accent cursor-pointer hover:outline outline-accent"
            type="submit"
            value={isSubmitting ? "Submitting..." : "Submit"}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default GetAppointment;
