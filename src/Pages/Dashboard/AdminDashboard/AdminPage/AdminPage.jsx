import React from "react";
import { FaPlus, FaUserAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FcCalendar, FcHome, FcNews, FcPlus, FcSettings } from "react-icons/fc";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdManageHistory, MdOutlineAddHomeWork } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminPage = () => {
  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center justify-center">
      {/* <h1 className="py-20">Admin page</h1> */}
      <div className="w-fit grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          to={"add-Blog"}
          className="w-44 md:w-52 h-36 bg-white rounded-lg shadow-md flex flex-col-reverse items-center justify-center gap-2 text-sky-400 uppercase hover:bg-slate-50 font-semibold hover:border border-sky-400 hover:scale-105 duration-300"
        >
          Add Blog
          <FcPlus className="text-3xl" />
        </Link>
        <Link
          to={"manage-blogs"}
          className="w-44 md:w-52 h-36 bg-white rounded-lg shadow-md flex flex-col-reverse items-center justify-center gap-2 text-blue-600 uppercase hover:bg-slate-50 font-semibold hover:border border-blue-600 hover:scale-105 duration-300"
        >
          Manage Blogs
          <FcNews className="text-3xl font-bold" />
        </Link>
        <Link
          to={"/add-apartment"}
          className="w-44 md:w-52 h-36 bg-white rounded-lg shadow-md flex flex-col-reverse items-center justify-center gap-2 text-sky-400 uppercase hover:bg-sky-50 font-semibold hover:border border-sky-400 hover:scale-105 duration-300"
        >
          Sell Apartment
          <FcHome className="text-3xl" />
        </Link>
        <Link
          to={"manage-post"}
          className="w-44 md:w-52 h-36 bg-white rounded-lg shadow-md flex flex-col-reverse items-center justify-center gap-2 text-yellow-400 uppercase hover:bg-yellow-50 font-semibold hover:border border-yellow-400 hover:scale-105 duration-300"
        >
          Manage Post
          <FcSettings className="text-3xl font-bold" />
        </Link>
        <Link
          to={"manage-appointments"}
          className="w-44 md:w-52 h-36 bg-white rounded-lg shadow-md flex flex-col-reverse items-center justify-center gap-2 text-green-400 uppercase hover:bg-green-50 font-semibold hover:border border-green-400 hover:scale-105 duration-300 text-center px-4"
        >
          Manage Appointment
          <FcCalendar className="text-3xl font-bold" />
        </Link>
        <Link
          to={"manage-users"}
          className="w-44 md:w-52 h-36 bg-white rounded-lg shadow-md flex flex-col-reverse items-center justify-center gap-2 text-purple-400 uppercase hover:bg-purple-50 font-semibold hover:border border-purple-400 hover:scale-105 duration-300 text-center px-4"
        >
          Manage Users
          <FaUsers className="text-3xl font-bold" />
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
