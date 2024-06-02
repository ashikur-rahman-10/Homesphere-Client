import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import Login from "../../Pages/Login & Register/Login";

const NavigationBar = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/apartments"
          className="px-4 py-2 rounded-full bg-white hover:bg-opacity-0 border hover:outline border-white bg-opacity-30"
        >
          Apartments
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/articles"
          className="px-4 py-2 rounded-full bg-white hover:bg-opacity-0 border hover:outline border-white bg-opacity-30"
        >
          Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className="px-4 py-2 rounded-full bg-white hover:bg-opacity-0 border hover:outline border-white bg-opacity-30"
        >
          About Us
        </NavLink>
      </li>
      <li>
        <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="px-4 py-2 rounded-full bg-white hover:bg-opacity-0 border hover:outline border-white bg-opacity-30"
        >
          Join Us
        </button>
      </li>
    </>
  );

  return (
    <div
      className={`navbar lg:px-32 my-0 py-0 fixed w-full z-50 transition-all duration-300 ${
        scroll
          ? "bg-gradient-to-bl from-[#aef7fa] via-white to-white border shadow-md"
          : "bg-transparent "
      }`}
    >
      <div className="lg:navbar-start w-full">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost  absolute z-30 lg:relative -top-6 lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  z-[1] p-2 mt-8 ml-0 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <div className="w-full absolute z-20  flex lg:justify-start justify-around">
          <NavLink to="/" className="btn btn-ghost text-xl ">
            Abacus Realty
          </NavLink>
        </div>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 z-30">{navOptions}</ul>
      </div>

      {/* Login Modal */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {/* login form */}
          <Login></Login>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NavigationBar;
