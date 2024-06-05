import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../Hooks/UseAuth";
import UseAdmin from "../Hooks/UseAdmin";
import CustomLoader from "../Components/CustomLoader/CustomLoader";

const AdminOnly = ({ children }) => {
  const { user, loading } = useAuth();
  const { admin, adminLoading } = UseAdmin();

  useEffect(() => {
    if (!admin && !user && !loading) {
      <Navigate to="/login" />;
    }
  }, [user, admin, loading]);

  if (adminLoading) {
    return <CustomLoader />;
  }
  if (!admin && user) {
    return (
      <div className="w-full h-[80vh] flex-col text-red-500 text-3xl font-bold uppercase font-mono flex items-center justify-center">
        Entry Restricted <br />
        <span className="text-xl">authorised person only</span>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
        <h1>Please Login to continue</h1>
        <Link
          to={"/login"}
          className="bg-sky-400 hover:bg-sky-600 text-white px-4 py-1 rounded-full"
        >
          Go to login page
        </Link>
      </div>
    );
  }

  return children;
};

export default AdminOnly;
