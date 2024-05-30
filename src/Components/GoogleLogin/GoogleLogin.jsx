import React, { useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState();
  const location = useLocation();
  const from = location?.state?.pathname || "/";
  const navigate = useNavigate();

  // Google Login
  const hangleGoogle = () => {
    loginWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        const { displayName, photoURL, email } = loggedUser;
        const savedUser = {
          name: displayName,
          photoURL,
          email,
          role: "buyer",
        };

        fetch("https://bornomala-boighor-server.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(savedUser),
        });

        toast.success("Successfully Login!");
        setError("");
        navigate(from);
        window.location.reload();
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
              alt=""
            />
          </span>
          <p>Continue with Google</p>
        </div>
      </div>

      <Toaster></Toaster>
    </div>
  );
};

export default GoogleLogin;
