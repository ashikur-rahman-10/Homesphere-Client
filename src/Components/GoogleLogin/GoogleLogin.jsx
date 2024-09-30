import React, { useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const [error, setError] = useState();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();

  // Google Login
  const hangleGoogle = () => {
    googleLogin()
      .then((result) => {
        const loggedUser = result.user;
        const { displayName, photoURL, email } = loggedUser;
        const savedUser = {
          name: displayName,
          photoURL,
          email,
          role: "buyer",
        };

        const token = localStorage.getItem("access-token");

        fetch("https://abacus-realty-server.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(savedUser),
        });
        toast.success("Successfully Login!");
        setError("");
        navigate(from);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div
        onClick={hangleGoogle}
        className="w-full flex justify-center cursor-pointer bg-white px-4 py-2 border rounded-md hover:border-accent"
      >
        <div className="flex gap-2 justify-center items-center">
          <span>
            <img
              className="w-10 p-[6px] border rounded-full hover:saturate-0 bg-slate-200 cursor-pointer"
              src="https://i.ibb.co/HX7Z8g9/google-logo-png-suite-everything-you-need-know-about-google-newest-0-removebg-preview.png"
              alt="Google Logo"
            />
          </span>
          <p>Continue with Google</p>
        </div>
      </div>

      {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}

      <Toaster />
    </div>
  );
};

export default GoogleLogin;
