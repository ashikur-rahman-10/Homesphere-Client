import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/UseAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      Swal.fire({
        title: "Warning",
        text: "Please log in to continue.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        setShowAlert(true);
      });
    }
  }, [loading, user, location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return children;
  }

  if (showAlert) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Return null or a fragment while waiting for the alert
  return null;
};

export default PrivateRoute;
