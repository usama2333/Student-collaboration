"use client";

import "../../styles/adduser.css";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import Image from "next/image";

export default function AddUsers() {
  // for handling image
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("imageInput").click();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);

    toast.success("Add User successfully", {
      position: "top-right",
      autoClose: 3000, // Close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <>
      <div className="main_con">
        <div className="info_div">
          <p className="info_text">General Info</p>
        </div>
        {/* form container */}
        <div className="form_con">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-flex-row">
              {/* form first haf */}
              <div className="flex-grow-1">
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className={`form-label ${errors.name ? "error-label" : ""}`}
                  >
                    Name{" "}
                    {errors.name && <span className="error-asterisk">*</span>}
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                    className="form-input"
                  />
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label
                    htmlFor="email"
                    className={`form-label ${
                      errors.email ? "error-label" : ""
                    }`}
                  >
                    Email{" "}
                    {errors.email && <span className="error-asterisk">*</span>}
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="password"
                    className={`form-label ${
                      errors.password ? "error-label" : ""
                    }`}
                  >
                    Password{" "}
                    {errors.password && (
                      <span className="error-asterisk">*</span>
                    )}
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="form-input"
                  />
                </div>

                {/* Role Select */}
                <div className="form-group">
                  <label
                    htmlFor="role"
                    className={`form-label ${errors.role ? "error-label" : ""}`}
                  >
                    Role{" "}
                    {errors.role && <span className="error-asterisk">*</span>}
                  </label>
                  <select
                    {...register("role", {
                      required: "Please select a role",
                    })}
                    className="form-select"
                  >
                    <option value="">Select a role</option>
                    <option value="superadmin">Superadmin</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                {/* Department Select */}
                <div className="form-group">
                  <label
                    htmlFor="department"
                    className={`form-label ${
                      errors.department ? "error-label" : ""
                    }`}
                  >
                    Department{" "}
                    {errors.department && (
                      <span className="error-asterisk">*</span>
                    )}
                  </label>
                  <select
                    {...register("department", {
                      required: "Please select a department",
                    })}
                    className="form-select"
                  >
                    <option value="">Select a department</option>
                    <option value="IT">IT</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* form second haf */}
              <div className="flex-grow-1">
                {/* image flex */}

                <div className="upload-container">
                  <p className="upload-text">Upload Image</p>

                  {/* Image Preview */}
                  <div className="image-box">
                    {!selectedImage && (
                      <Image
                        src="/images/dummy.png"
                        alt="Upload"
                        width={70}
                        height={70}
                      />
                    )}
                    {selectedImage && (
                      <div className="image-preview">
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected"
                          className="selected-img"
                        />
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="button-box">
                    <button onClick={handleButtonClick} className="upload-btn">
                      <Image
                        src="/images/download.png"
                        alt="Upload"
                        className="icon"
                        width={30} // Set the width
                        height={30} // Set the height
                      />
                      Upload
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      id="imageInput"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </div>

                  {/* Cancel Button */}
                  {selectedImage && (
                    <Image
                      onClick={() => setSelectedImage(null)}
                      src="/images/cancel.png"
                      alt="Cancel"
                      className="cancel-btn"
                      width={30} // Set the width
                      height={30} // Set the height
                    />
                  )}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="phone"
                    className={`form-label ${
                      errors.phone ? "error-label" : ""
                    }`}
                  >
                    Phone{" "}
                    {errors.phone && <span className="error-asterisk">*</span>}
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Enter your phone"
                    {...register("phone", { required: "Phone is required" })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="cnic"
                    className={`form-label ${errors.cnic ? "error-label" : ""}`}
                  >
                    Cnic{" "}
                    {errors.cnic && <span className="error-asterisk">*</span>}
                  </label>
                  <input
                    id="cnic"
                    type="text"
                    placeholder="Enter your cnic"
                    {...register("cnic", { required: "Cnic is required" })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="address"
                    className={`form-label ${
                      errors.address ? "error-label" : ""
                    }`}
                  >
                    Address{" "}
                    {errors.address && (
                      <span className="error-asterisk">*</span>
                    )}
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    {...register("address", {
                      required: "address is required",
                    })}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="create-button">
              Create
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
