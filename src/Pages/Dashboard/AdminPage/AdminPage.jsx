import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center ">
      <h1 className="py-20">Admin page</h1>
      <div className="w-fit">
        <Link
          to={"add-apartment"}
          className="w-52 h-36 bg-white rounded-lg shadow-md flex flex-col-reverse items-center justify-center gap-2 text-sky-400 uppercase hover:bg-slate-50 font-semibold hover:border border-sky-400 hover:scale-105 duration-300"
        >
          Add appartment
          <FaPlus className="text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
