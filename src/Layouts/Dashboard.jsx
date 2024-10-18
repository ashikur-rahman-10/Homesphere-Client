import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/abacus-logo.ico";
import useAuth from "../Hooks/UseAuth";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignout = () => {
    logout();
    navigate("/");
  };
  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className="px-3 py-2 rounded-full bg-white hover:bg-opacity-0 border hover:outline border-white bg-opacity-30"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className="px-3 py-2 rounded-full bg-white hover:bg-opacity-0 border hover:outline border-white bg-opacity-30"
        >
          Dashboard
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/apartments"
          className="px-3 py-2 rounded-full bg-white hover:bg-opacity-0 border hover:outline border-white bg-opacity-30"
        >
          Appartments
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/articles"
          className="px-3 py-2 rounded-full bg-white hover:bg-opacity-0 border hover:outline border-white bg-opacity-30"
        >
          Articles
        </NavLink>
      </li>

      <li>
        <button
          onClick={handleSignout}
          className="px-3 py-2 rounded-full bg-white hover:bg-opacity-0 border hover:outline outline-red-400 border-red-400 bg-opacity-30 text-red-500"
        >
          Logout
        </button>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar lg:px-24 my-0 py-0 fixed w-full z-50 transition-all duration-300 bg-accent">
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
            <NavLink
              to="/"
              className="btn btn-ghost text-xl bg-white bg-opacity-80 rounded-full"
            >
              <img className="w-36 h-10" src={logo} alt="" />
            </NavLink>
          </div>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 z-30">{navOptions}</ul>
        </div>
      </div>

      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-7xl w-full min-h-[90vh] px-4 mx-auto pt-16 ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
