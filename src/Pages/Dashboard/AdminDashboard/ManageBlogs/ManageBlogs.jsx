import React, { useState } from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRight, FaPen, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const ManageBlogs = () => {
  const [axiosSecure] = UseAxiosSecure();
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Get blogs
  const { data: blogs = [], refetch: blogsRefetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs`);
      return res.data;
    },
  });

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content });
  };

  const handleSave = async () => {
    if (editingBlog) {
      await axiosSecure.patch(`/blogs/${editingBlog._id}`, {
        ...editingBlog,
        title: formData.title,
        content: formData.content,
      });
      blogsRefetch();
      setEditingBlog(null);
      Swal.fire({
        title: "Success",
        text: "Blog updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCancel = () => {
    setEditingBlog(null);
    setFormData({ title: "", content: "" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/blogs/${id}`);
      blogsRefetch();
      toast.success("Delete Successfully!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div>
      <h1 className="text-center text-3xl py-3">Manage Blogs</h1>
      <div className="pt-6 space-y-4 max-w-2xl mx-auto">
        {blogs.map((b) => (
          <div
            key={b._id}
            className="flex gap-4 border rounded-xl shadow-md pr-4"
          >
            <img
              className="w-32 rounded-l-xl object-cover"
              src={b.image}
              alt={b.title}
            />
            <div className="flex flex-col justify-between py-2">
              <h3 className="text-base font-semibold">{b.title}</h3>
              <p className="text-gray-500 text-xs">
                Published in: {new Date(b.date).toLocaleDateString()}
              </p>
              <div className="pt-2 flex items-center gap-5">
                <button
                  onClick={() => handleEdit(b)}
                  className="bg-yellow-50 border border-white hover:border-yellow-400 hover:bg-yellow-400 hover:text-white text-yellow-400 rounded-full p-2"
                >
                  <FaPen className="text-lg" />
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
                  className="bg-red-50 border border-white hover:border-red-400 hover:bg-red-400 hover:text-white text-red-400 rounded-full p-2"
                >
                  <FaTrash className="text-lg" />
                </button>
                <Link
                  to={`/blogs/${b._id}`}
                  className="bg-blue-50 border border-white hover:border-blue-400 hover:bg-blue-400 hover:text-white text-blue-400 rounded-full py-1 px-2 text-xs items-center flex gap-2"
                >
                  Open <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editingBlog && (
        <div className="fixed z-20 inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-y-auto w-full">
          <div className="bg-white p-4 rounded-lg mx-2 mt-16 max-h-full h-[570px] overflow-y-auto relative w-full max-w-4xl">
            <h2 className="text-2xl mb-4">Edit Blog</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700">
                  Content:
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="border p-2 w-full h-80 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Toaster></Toaster>
    </div>
  );
};

export default ManageBlogs;
