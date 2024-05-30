import React, { useState } from "react";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/register");
  };
  return (
    <div>
      <form
        // onSubmit={handleSubmit}
        className="w-[350px] mx-auto "
      >
        <h1 className="text-3xl text-center font-medium mb-8">Login</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            required
            className="input input-bordered input-accent focus:outline-none w-[350px]"
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={show ? "text" : "password"}
            placeholder="password"
            name="password"
            required
            className=" input input-bordered input-accent  focus:outline-none  w-[350px]"
          />
          <div
            onClick={() => {
              setShow(!show);
            }}
            className="absolute bottom-4 right-4 cursor-pointer text-xl hover:text-red-700"
          >
            {show ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
          </div>
        </div>
        <span className="w-full flex justify-center mt-4">
          <small className="text-red-600">{error}</small>
        </span>
        <input
          className="bg-accent cursor-pointer text-white py-[10px] rounded-3xl mt-4 hover:bg-transparent hover:text-accent hover:outline outline-accent font-medium w-full"
          type="submit"
          value="Login"
        />
        <div className="w-full text-center mt-4">
          <button
            type="button"
            className="text-red-500 underline"
            // onClick={handleResetPassword}
          >
            Forgot Password?
          </button>
        </div>
        <div className="divider">or sign up with</div>
        <GoogleLogin></GoogleLogin>
        <span className="flex w-full justify-center mt-3">
          <small className="text-center">
            Dont’t Have An Account?{" "}
            <span
              onClick={handleNavigate}
              className="text-warning underline cursor-pointer"
            >
              Register
            </span>
          </small>
        </span>
      </form>
    </div>
  );
};

export default Login;
