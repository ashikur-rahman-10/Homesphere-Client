import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/UseAuth";

const AddBlog = () => {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { user } = useAuth();

  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_HOSTING_KEY
  }`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    const { title, content, image } = data;
    setCreating(true);

    const formData = new FormData();
    formData.append("image", image[0]);

    try {
      const res = await fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      });
      const imgResponse = await res.json();
      if (imgResponse.success) {
        const imgUrl = imgResponse.data.display_url;
        const newBlogPost = {
          title,
          content,
          image: imgUrl,
          date: new Date().toISOString(),
          postedBy: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
          },
        };

        // Replace this URL with the endpoint to save the blog post on your server
        const response = await fetch(
          "https://abacus-realty-server.vercel.app/blogs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBlogPost),
          }
        );

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Blog post created successfully!",
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/articles");
        } else {
          throw new Error("Failed to save blog post to the server.");
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-[90vh]">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="relative bg-gray-100 p-6 rounded-lg shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-pink-200 transform translate-x-4 translate-y-4 rounded-lg z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Add a New Blog Post
            </h2>
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  className="mt-1 block w-full px-4 py-2 border-b-2 border-black focus:outline-none focus:ring-0 sm:text-sm"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  {...register("content", { required: "Content is required" })}
                  rows="4"
                  className="mt-1 block w-full px-4 py-2 border-b-2 border-black focus:outline-none focus:ring-0 sm:text-sm"
                />
                {errors.content && (
                  <p className="text-red-600 text-sm">
                    {errors.content.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  {...register("image", { required: "Image is required" })}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                />
                {errors.image && (
                  <p className="text-red-600 text-sm">{errors.image.message}</p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={creating}
                  className="inline-flex items-center px-4 py-2 bg-orange-300 text-gray-800 font-medium rounded shadow-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition duration-150 ease-in-out"
                >
                  {creating ? "Creating..." : "Add Blog Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
