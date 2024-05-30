import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login & Register/Login";
import Register from "../Pages/Login & Register/Register";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/login",
        element: (
          <div className=" bg-gray-50 min-h-[100vh] flex items-center justify-center w-full">
            <Login></Login>
          </div>
        ),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },

      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);

export default router;
