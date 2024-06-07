import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAdmin from "../../../Hooks/UseAdmin";
import useAuth from "../../../Hooks/UseAuth";
import useThisUser from "../../../Hooks/UseThisUser";

const AddApartment = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { admin } = UseAdmin();
  const { thisUser } = useThisUser();

  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_HOSTING_KEY
  }`;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setUploadProgress(0);
    const {
      title,
      details,
      bedroom,
      washroom,
      garages,
      size,
      location,
      price,
      keywords,
      balcony,
    } = data;
    const postStatus = admin ? "approved" : "pending";

    const imageFiles = data.thumbnail;
    const imageUrls = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const formData = new FormData();
      formData.append("image", imageFiles[i]);

      const res = await fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      });

      const imgResponse = await res.json();
      if (imgResponse.success) {
        imageUrls.push(imgResponse.data.display_url);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to upload image. Please try again.",
          timer: 3000,
        });
        setIsSubmitting(false);
        return;
      }

      setUploadProgress(((i + 1) / imageFiles.length) * 100);
    }

    // Handle floor plan image upload
    const floorPlanFormData = new FormData();
    floorPlanFormData.append("image", data.floorPlan[0]);

    const floorPlanRes = await fetch(imageHostingUrl, {
      method: "POST",
      body: floorPlanFormData,
    });

    const floorPlanResponse = await floorPlanRes.json();
    let floorPlanUrl = "";
    if (floorPlanResponse.success) {
      floorPlanUrl = floorPlanResponse.data.display_url;
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to upload floor plan. Please try again.",
        timer: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    const apartment = {
      title,
      details,
      thumbnails: imageUrls,
      floorPlan: floorPlanUrl,
      bedroom,
      washroom,
      garages,
      size,
      location,
      price,
      keywords,
      postedIn: new Date(),
      impression: 0,
      balcony,
      buildYear,
      postStatus,
      soldBy: thisUser,
    };

    try {
      const response = await fetch(
        "https://abacus-realty-server.vercel.app/apartments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apartment),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Apartment added successfully!",
          showConfirmButton: false,
          timer: 3000,
        });
        reset();
      } else {
        const errorResponse = await response.json(); // Add this line
        console.error("Server response:", errorResponse); // And this line
        throw new Error("Failed to add apartment. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        text: error.message,
        timer: 3000,
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100vh] w-full px-4  md:py-1 text-xs z-0 ">
      <form
        className="w-full max-w-2xl border px-6 py-12 md:p-12 rounded-xl shadow-md space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl text-center text-gray-500 pb-5">
          Sell Apartment
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block mb-2 text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              className="border border-accent rounded-md px-4 py-[6px] w-full"
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              {...register("title", { required: true })}
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-gray-700" htmlFor="thumbnail">
              Thumbnails
            </label>
            <input
              className="border border-accent rounded-md px-4 py-[6px] w-full"
              type="file"
              id="thumbnail"
              name="thumbnail"
              {...register("thumbnail", { required: true })}
              required
              multiple
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-gray-700" htmlFor="floorPlan">
              Floor Plan
            </label>
            <input
              className="border border-accent rounded-md px-4 py-[6px] w-full"
              type="file"
              id="floorPlan"
              name="floorPlan"
              {...register("floorPlan", { required: true })}
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-gray-700" htmlFor="bedroom">
              Number of Beds
            </label>
            <input
              className="border border-accent rounded-md px-4 py-[6px] w-full"
              type="number"
              id="bedroom"
              name="bedroom"
              placeholder="Number of beds"
              {...register("bedroom", { required: true })}
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-gray-700" htmlFor="washroom">
              Number of Washrooms
            </label>
            <input
              className="border border-accent rounded-md px-4 py-[6px] w-full"
              type="number"
              id="washroom"
              name="washroom"
              placeholder="Number of washrooms"
              {...register("washroom", { required: true })}
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-gray-700" htmlFor="size">
              Area (SqFt)
            </label>
            <input
              className="border border-accent rounded-md px-4 py-[6px] w-full"
              type="number"
              id="size"
              name="size"
              placeholder="Area (SqFt)"
              {...register("size", { required: true })}
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-gray-700" htmlFor="garages">
              Garages
            </label>
            <select
              className="border border-accent rounded-md px-4 py-[6px] w-full"
              id="garages"
              name="garages"
              {...register("garages", { required: true })}
              required
            >
              <option value="">Select number of garages</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block mb-2 text-gray-700" htmlFor="balcony">
              Balcony
            </label>
            <input
              className="border border-accent rounded-md px-4 py-[6px] w-full"
              type="number"
              id="balcony"
              name="balcony"
              placeholder="Balcony"
              {...register("balcony", { required: true })}
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-gray-700" htmlFor="price">
              Price
            </label>
            <input
              className="border border-accent rounded-md px-4 py-[6px] w-full"
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              {...register("price", { required: true })}
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-gray-700" htmlFor="location">
              Location
            </label>
            <input
              className="border border-accent rounded-md px-4 py-[6px] w-full"
              type="text"
              id="location"
              name="location"
              placeholder="Location"
              {...register("location", { required: true })}
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-2 text-gray-700" htmlFor="keywords">
              Build Year
            </label>
            <input
              className="border border-accent rounded-md px-4 py-[6px] w-full"
              type="number"
              id="buildYear"
              name="buildYear"
              placeholder="build Year "
              {...register("buildYear", { required: true })}
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-2 text-gray-700" htmlFor="details">
              Details
            </label>
            <textarea
              className="border border-accent rounded-md px-4 py-[6px] w-full"
              id="details"
              name="details"
              placeholder="Details"
              rows="3"
              {...register("details", { required: true })}
              required
            ></textarea>
          </div>
        </div>

        <div className="w-full flex items-center justify-center text-center">
          <input
            className="border border-accent rounded-full px-4 py-2 w-full text-white bg-accent hover:bg-white hover:text-accent cursor-pointer hover:outline outline-accent"
            type="submit"
            value={isSubmitting ? "Submitting..." : "Submit"}
            disabled={isSubmitting}
          />
        </div>
      </form>
      {isSubmitting && (
        <div className="fixed z-50 bg-white -top-4 min-h-screen w-full flex items-center justify-center mt-4 px-10">
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full "
              style={{ width: `${uploadProgress}%` }}
            ></div>

            <h1 className="text-center text-lg pt-2">
              Uploading {uploadProgress}%
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddApartment;
