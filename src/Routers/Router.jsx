import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login & Register/Login";
import Register from "../Pages/Login & Register/Register";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layouts/Dashboard";
import AdminPage from "../Pages/Dashboard/AdminPage/AdminPage";
import AdminOnly from "./AdminOnly";
import AddApartment from "../Pages/Dashboard/AddApartment/AddApartment";
import Apartments from "../Pages/Apartments/Apartments";

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
        path: "add-apartment",
        element: <AddApartment />,
      },
    ],
  },
]);

export default router;
