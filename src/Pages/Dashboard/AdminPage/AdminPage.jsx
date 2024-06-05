import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin page</h1>

      <Link to={"add-apartment"}>Add appartment</Link>
    </div>
  );
};

export default AdminPage;
