import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../../../Hooks/UseAuth";
import toast from "react-hot-toast";

const GiveReview = () => {
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(0);
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const { review } = data;
    const reviewData = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      rating,
      review,
    };

    try {
      // Send reviewData to your backend for processing/storage
      console.log(reviewData);
      // Example: Replace with actual API call
      const response = await fetch(
        "https://abacus-realty-server.vercel.app/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      // if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Review Submitted Successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      reset();
      window.location.reload();
      // } else {
      //   throw new Error("Failed to submit review.");
      // }
    } catch (error) {
      console.error("Error submitting review:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
        text: "Failed to submit review. Please try again later.",
      });
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };
  // Scroll to top
  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  return (
    <div className="">
      <div className="block md:hidden px-2">
        {user ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" w-full max-w-lg shadow-xl h-96 rounded-2xl my-5 py-8 px-8 space-y-4"
          >
            <h1 className="text-2xl text-center font-medium mb-5">
              Give a Review
            </h1>

            <div className="form-control">
              <div className="flex items-center">
                <span className="mr-2">Rating:</span>
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        className="hidden"
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => handleRatingClick(ratingValue)}
                      />
                      <FaStar
                        className="cursor-pointer text-accent"
                        size={24}
                        color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="form-control">
              <textarea
                placeholder="Write your review..."
                {...register("review", { required: true })}
                required
                rows={4}
                className="border border-accent w-full py-1 px-4 rounded-lg h-40 input-bordered input-accent focus:outline-none "
              />
            </div>
            <div className="w-full text-center">
              <input
                className="bg-accent cursor-pointer text-white py-[10px] rounded-3xl mt-4 hover:bg-transparent w-80 hover:text-accent hover:outline outline-accent font-medium"
                type="submit"
                value="Submit Review"
              />
            </div>
          </form>
        ) : (
          <div className="text-center w-96 h-60 flex flex-col items-center justify-center">
            <p className="text-lg font-semibold mb-4">
              Please{" "}
              <Link to="/login" className="text-info underline">
                Login
              </Link>{" "}
              to leave a review.
            </p>
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-info underline">
                Sign Up
              </Link>{" "}
              now!
            </p>
          </div>
        )}
      </div>
      <div className="relative min-h-[80vh] hidden md:block">
        <div className="">
          <img
            className="md:w-[70%] md:h-[80vh] hidden md:block h-60"
            src="https://i.ibb.co.com/7Rs0V1q/Picsart-24-09-30-20-03-1619.jpg"
          />
        </div>
        <div className="absolute md:w-[70%]  lg:w-full z-10 top-0 right-0 flex items-center justify-center">
          <div className="md:w-fit w-full relative md:min-h-[80vh] h-60 flex items-center justify-end ">
            {user ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" w-full max-w-lg  h-96 rounded-2xl my-5 py-8 px-8 space-y-4"
              >
                <h1 className="text-2xl text-center font-medium mb-5">
                  Give a Review
                </h1>

                <div className="form-control">
                  <div className="flex items-center">
                    <span className="mr-2">Rating:</span>
                    {[...Array(5)].map((star, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={index}>
                          <input
                            className="hidden"
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => handleRatingClick(ratingValue)}
                          />
                          <FaStar
                            className="cursor-pointer text-accent"
                            size={24}
                            color={
                              ratingValue <= rating ? "#ffc107" : "#e4e5e9"
                            }
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="form-control">
                  <textarea
                    placeholder="Write your review..."
                    {...register("review", { required: true })}
                    required
                    rows={4}
                    className="border border-accent  w-96  py-1 px-4 rounded-lg h-40 input-bordered input-accent focus:outline-none "
                  />
                </div>
                <div className="w-full text-center">
                  <input
                    className="bg-accent cursor-pointer text-white py-[10px] rounded-3xl mt-4 hover:bg-transparent w-96 hover:text-accent hover:outline outline-accent font-medium"
                    type="submit"
                    value="Submit Review"
                  />
                </div>
              </form>
            ) : (
              <div className="text-center w-96">
                <p className="text-lg font-semibold mb-4">
                  Please{" "}
                  <Link to="/login" className="text-info underline">
                    Login
                  </Link>{" "}
                  to leave a review.
                </p>
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-info underline">
                    Sign Up
                  </Link>{" "}
                  now!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveReview;
