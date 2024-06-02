import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const [error, setError] = useState(null);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();

  // Google Login
  const handleGoogle = () => {
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

        fetch("https://abacus-realty-server.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(savedUser),
        })
          .then((response) => response.json())
          .then((data) => {
            if (response.ok) {
              toast.success("Successfully Logged In!");
              setError(null);
              navigate(from, { replace: true });
            } else {
              throw new Error(data.message || "Failed to save user");
            }
          })
          .catch((error) => {
            setError(error.message);
            toast.error(`Google login failed: ${error.message}`);
          });
      })
      .catch((error) => {
        setError(error.message);
        toast.error(`Google login failed: ${error.message}`);
      });
  };

  return (
    <div>
      <div
        onClick={handleGoogle}
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

      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Toaster />
    </div>
  );
};

export default GoogleLogin;
