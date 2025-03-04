"use client";

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "../../styles/adduser.css"

export default function AddUsers() {
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

    setTimeout(() => {
        router.push("/login"); // Redirect to login page after toast
      }, 1000); // Wait for the toast to finish before redirecting
  };

    return (
      <>
       <div className="main_con">
         <div className="info_div">
          <p className="info_text">General Info</p>
         </div>
               {/* form container */}
      <div className="form_main_con">

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label
              htmlFor="name"
              className={`form-label ${errors.name ? "error-label" : ""}`}
            >
              Name {errors.name && <span className="error-asterisk">*</span>}
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="form-input"
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label
              htmlFor="email"
              className={`form-label ${errors.email ? "error-label" : ""}`}
            >
              Email {errors.email && <span className="error-asterisk">*</span>}
            </label>
            <input
              id="email"
              type="email"
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


          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Create
          </button>
      
        </form>
      </div>
      <ToastContainer />
         
       </div>
      
      </>
    );
  }
  