import React from "react";
import { useParams } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Article = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { id } = useParams();
  // Get blogs
  const { data: blog = [], refetch: blogRefetch } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${id}`);
      return res.data;
    },
  });

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return (
    <div className="py-16 max-w-6xl mx-auto">
      <div className="bg-white  mb-4">
        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-sm object-cover w-full max-h-96 max-w-2xl mx-auto"
        />
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-2">{blog.title}</h2>
          <pre className="text-gray-700 whitespace-pre-wrap font-sans pt-6">
            {blog.content}
          </pre>
          <p className="mt-4 text-sm text-gray-600">
            Posted By: {blog.postedBy?.name}
          </p>
          <p className="text-sm text-gray-600">
            Date: {new Date(blog.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Article;
