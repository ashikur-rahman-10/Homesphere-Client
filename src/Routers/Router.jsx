import { Link, createBrowserRouter, useNavigate } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login & Register/Login";
import Register from "../Pages/Login & Register/Register";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layouts/Dashboard";
import AdminOnly from "./AdminOnly";
import Apartments from "../Pages/Apartments/Apartments";
import PrivateRoute from "./PrivateRoute";
import ApartmentDetails from "../Pages/ApartmentDetails/ApartmentDetails";
import GetAppointment from "../Pages/GetAppointment/GetAppointment";
import AddApartment from "../Pages/AddApartment/AddApartment";
import AdminPage from "../Pages/Dashboard/AdminDashboard/AdminPage/AdminPage";
import AddBlog from "../Pages/Dashboard/AdminDashboard/AddBlog/AddBlog";
import ManagePost from "../Pages/Dashboard/AdminDashboard/ManagePost/ManagePost";
import Articles from "../Pages/Articles/Articles";
import ManageBlogs from "../Pages/Dashboard/AdminDashboard/ManageBlogs/ManageBlogs";
import Article from "../Pages/Articles/Article";
import notFound from "../assets/404.gif";
import { FaHome } from "react-icons/fa";
import UserPage from "../Pages/Dashboard/UserDashboard/UserPage/UserPage";
import ManageMyPost from "../Pages/Dashboard/UserDashboard/ManageMyPost/ManageMyPost";
import SearchPage from "../Pages/SearchPage/SearchPage";
import MySavedPost from "../Pages/Dashboard/UserDashboard/MySavedPost/MySavedPost";
import TermsAndConditionsPage from "../Pages/TearmsAndConditions/TermsAndConditionsPage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import GiveReview from "../Pages/Dashboard/UserDashboard/GiveReview/GiveReview";
import ManageProfile from "../Pages/Dashboard/UserDashboard/ManageProfile/ManageProfile";
import ManageAppointments from "../Pages/Dashboard/AdminDashboard/ManageAppointments/ManageAppointments";
import MyAppointment from "../Pages/Dashboard/UserDashboard/MyAppointment/MyAppointment";
import UserRequirement from "../Pages/UserRequirement/UserRequirement";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <img className="lg:w-[40%]" src={notFound} alt="" />
        <Link
          to={"/"}
          className="bg-accent text-white px-6 py-2 rounded-full flex items-center gap-1 text-sm hover:bg-blue-500"
        >
          Home <FaHome className="text-xl" />
        </Link>
      </div>
    ),
  },
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "login",
        element: (
          <div className="bg-gray-50 min-h-[100vh] flex items-center justify-center w-full">
            <Login />
          </div>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user-requirement",
        element: <UserRequirement />,
      },
      {
        path: "/apartments",
        element: <Apartments />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/terms-conditions",
        element: <TermsAndConditionsPage />,
      },
      {
        path: "/articles",
        element: <Articles></Articles>,
      },
      {
        path: "/search/:searchTerm",
        element: <SearchPage />,
      },
      {
        path: "/give-review",
        element: (
          <PrivateRoute>
            <GiveReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-profile/:id",
        element: (
          <PrivateRoute>
            <ManageProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/user-dashboard",
        element: (
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-post",
        element: (
          <PrivateRoute>
            <ManageMyPost />
          </PrivateRoute>
        ),
      },
      {
        path: "/saved-post",
        element: (
          <PrivateRoute>
            <MySavedPost />
          </PrivateRoute>
        ),
      },
      {
        path: "/apartments/:id",
        element: (
          <PrivateRoute>
            <ApartmentDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs/:id",
        element: (
          <PrivateRoute>
            <Article />
          </PrivateRoute>
        ),
      },
      {
        path: "add-apartment",
        element: (
          <PrivateRoute>
            <div className="pt-12">
              <AddApartment />
            </div>
          </PrivateRoute>
        ),
      },
      {
        path: "my-appointments",
        element: (
          <PrivateRoute>
            <div className="pt-12">
              <MyAppointment />
            </div>
          </PrivateRoute>
        ),
      },
      {
        path: "/get-appointment/:id",
        element: (
          <PrivateRoute>
            <div className="">
              <GetAppointment />
            </div>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminOnly>
        <Dashboard />
      </AdminOnly>
    ),
    children: [
      {
        path: "",
        element: <AdminPage />,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
      },
      {
        path: "manage-post",
        element: <ManagePost />,
      },
      {
        path: "manage-blogs",
        element: <ManageBlogs />,
      },
      {
        path: "manage-appointments",
        element: <ManageAppointments />,
      },
    ],
  },
]);

export default router;
