import React, { useEffect, useState } from "react";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const { user, login, loginWithGoogle, resetPassword } = useAuth();
  const location = useLocation();
  const from = location?.state?.pathname || "/";
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
      .then((result) => {
        const loggedUser = result.user;
        toast.success("Successfully Login!");
        setError("");
        navigate(from);
        window.location.reload();
        event.target.reset();
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleNavigate = () => {
    navigate("/register");
    window.location.reload();
  };

  const handleResetPassword = () => {
    Swal.fire({
      title: "Enter your email address",
      input: "email",
      inputPlaceholder: "Email address",
      showCancelButton: true,
      confirmButtonText: "Send reset link",
      preConfirm: (email) => {
        return resetPassword(email)
          .then(() => {
            Swal.fire({
              icon: "success",
              text: "Password reset email sent successfully",
              title: "Please check your email account.",
              showConfirmButton: false,
              timer: 3000,
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error.message}`);
          });
      },
    });
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "The email or password you entered is incorrect. Try again.",
      });
    }
  }, [error]);

  if (user) {
    window.location.replace("https://bornomala-mart.web.app/");
  }

  // Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-[350px] mx-auto">
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
            className="input input-bordered input-accent focus:outline-none w-[350px]"
          />
          <div
            onClick={() => {
              setShow(!show);
            }}
            className="absolute bottom-4 right-4 cursor-pointer text-xl hover:text-red-700"
          >
            {show ? <FaEye /> : <FaEyeSlash />}
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
            onClick={handleResetPassword}
          >
            Forgot Password?
          </button>
        </div>
        <div className="divider">or sign up with</div>
        <GoogleLogin />
        <span className="flex w-full justify-center mt-3">
          <small className="text-center">
            Don’t Have An Account?{" "}
            <span
              onClick={handleNavigate}
              className="text-warning underline cursor-pointer"
            >
              Register
            </span>
          </small>
        </span>
      </form>
      <Toaster></Toaster>
    </div>
  );
};

export default Login;
