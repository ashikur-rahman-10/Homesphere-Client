import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import useThisUser from "../../../../Hooks/UseThisUser";
import { FaPen } from "react-icons/fa";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const ManageProfile = () => {
  const [axiosSecure] = UseAxiosSecure();
  const { thisUser } = useThisUser();
  const { email, gender, name, phone, photoURL, nidNumber, address, zipcode } =
    thisUser || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    nidNumber: "",
    address: "",
    zipcode: "",
  });

  useEffect(() => {
    if (isModalOpen) {
      setFormData({
        phone: phone || "",
        nidNumber: nidNumber || "",
        address: address || "",
        zipcode: zipcode || "",
      });
    }
  }, [isModalOpen, phone, nidNumber, address, zipcode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosSecure.patch(`/users/${email}`, formData);
      if (response.data.acknowledged) {
        Swal.fire({
          title: "Success",
          text: "Profile updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update profile. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (!thisUser) return null; // or a loading spinner

  return (
    <div className="container mx-auto p-6 py-16">
      <div className="flex flex-col items-center pt-20 mb-6 space-y-4 md:flex-row md:space-y-0 md:space-x-6">
        <img
          src={photoURL}
          alt={`${name}'s profile`}
          className="w-32 mask mask-circle rounded-full"
        />
        <div>
          <p className="text-sm">
            <strong>Name:</strong> {name}
          </p>
          <p className="text-sm">
            <strong>Email:</strong> {email}
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> {phone}
          </p>
          <p className="text-sm">
            <strong>Gender:</strong> {gender}
          </p>
          <p className="text-sm">
            <strong>NID Number:</strong> {nidNumber}
          </p>
          <p className="text-sm">
            <strong>Address:</strong> {address}
          </p>
          <p className="text-sm">
            <strong>Zipcode:</strong> {zipcode}
          </p>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white text-xs py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        type="button"
        onClick={handleEditClick}
      >
        <FaPen /> Edit Info
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4"
        contentLabel="Edit Profile"
      >
        <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Edit Your Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-accent rounded-md shadow-sm px-4 py-2"
                placeholder="Phone"
              />
            </div>

            <div>
              <label
                htmlFor="nidNumber"
                className="block text-sm font-medium text-gray-700"
              >
                NID Number
              </label>
              <input
                type="text"
                id="nidNumber"
                name="nidNumber"
                value={formData.nidNumber}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-accent rounded-md shadow-sm px-4 py-2"
                placeholder="NID Number"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-accent rounded-md shadow-sm px-4 py-2 h-32 resize-none"
                placeholder="Address"
              />
            </div>

            <div>
              <label
                htmlFor="zipcode"
                className="block text-sm font-medium text-gray-700"
              >
                Zipcode
              </label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-accent rounded-md shadow-sm px-4 py-2"
                placeholder="Zipcode"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageProfile;
