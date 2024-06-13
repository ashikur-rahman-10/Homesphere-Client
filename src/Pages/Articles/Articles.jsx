import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

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

  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="container mx-auto py-8 max-w-7xl px-4 pt-16">
      <h1 className="text-4xl font-bold mb-4 text-center">Articles</h1>
      <div className="space-y-4">
        {blogs.map((b) => (
          <div
            key={b._id}
            className="flex gap-4 border rounded-xl shadow-md pr-4 max-w-2xl mx-auto "
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
                <Link
                  to={`/blogs/${b._id}`}
                  className="bg-blue-50 border border-white hover:border-blue-400 hover:bg-blue-400 hover:text-white text-blue-400 rounded-full py-1 px-2 text-xs items-center flex gap-2"
                >
                  Read more <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
