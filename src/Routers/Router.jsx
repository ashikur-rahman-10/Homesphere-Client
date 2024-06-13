import { createBrowserRouter } from "react-router-dom";
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

const router = createBrowserRouter([
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
        path: "/apartments",
        element: <Apartments />,
      },
      {
        path: "articles",
        element: <Articles></Articles>,
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
    ],
  },
]);

export default router;
