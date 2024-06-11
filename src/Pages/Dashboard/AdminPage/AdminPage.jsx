import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center ">
      <h1 className="py-20">Admin page</h1>
      <div className="w-fit grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          to={"add-Blog"}
          className="w-52 h-36 bg-white rounded-lg shadow-md flex flex-col-reverse items-center justify-center gap-2 text-sky-400 uppercase hover:bg-slate-50 font-semibold hover:border border-sky-400 hover:scale-105 duration-300"
        >
          Add Blog
          <FaPlus className="text-xl" />
        </Link>
        <Link
          to={"manage-blogs"}
          className="w-52 h-36 bg-white rounded-lg shadow-md flex flex-col-reverse items-center justify-center gap-2 text-blue-600 uppercase hover:bg-slate-50 font-semibold hover:border border-blue-600 hover:scale-105 duration-300"
        >
          Manage Blogs
          <IoNewspaperOutline className="text-3xl font-bold" />
        </Link>
        <Link
          to={"manage-post"}
          className="w-52 h-36 bg-white rounded-lg shadow-md flex flex-col-reverse items-center justify-center gap-2 text-yellow-400 uppercase hover:bg-slate-50 font-semibold hover:border border-yellow-400 hover:scale-105 duration-300"
        >
          Manage Post
          <MdManageHistory className="text-3xl font-bold" />
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
