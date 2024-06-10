import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Articles = () => {
  const [axiosSecure] = UseAxiosSecure();

  // Get blogs
  const { data: blogs = [], refetch: blogsRefetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs`);
      return res.data;
    },
  });

  return (
    <div className="container mx-auto py-8 max-w-7xl px-4 pt-16">
      <h1 className="text-4xl font-bold mb-4 text-center">Articles</h1>
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-white  mb-4">
          <img src={blog.image} alt={blog.title} className="rounded-t-lg" />
          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-700">
              {blog.content.split("\n").map((paragraph, index) => (
                <span key={index}>
                  {paragraph.includes("Your Credit Score") ? (
                    <span className="font-bold">{paragraph}</span>
                  ) : (
                    paragraph
                  )}
                  <br />
                </span>
              ))}
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Posted By: {blog.postedBy.name}
            </p>
            <p className="text-sm text-gray-600">
              Date: {new Date(blog.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Articles;
