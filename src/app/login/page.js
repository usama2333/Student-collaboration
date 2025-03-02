"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import "../auth.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    toast.success("Login successful!", {
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
    <div className="container">
      <div className="con_row">
        <div className="first_haf"></div>
        <div className="second_haf"></div>
      </div>

      {/* form container */}
      <div className="form_main_con">
        <p className="signup_text">LOGIN</p>
        <p className="fill_text mt">
          Please fill your detail to login into your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              className="form-input mt"
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div style={{ display: "flex", gap: "10px" }}>
              <label
                style={{ width: "100%" }}
                htmlFor="password"
                className={`form-label ${errors.password ? "error-label" : ""}`}
              >
                Password{" "}
                {errors.password && <span className="error-asterisk">*</span>}
              </label>
              <div
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </div>
            </div>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="form-input mt"
            />
          </div>

          <div className="forgot_row">
            <div className="remember-container">
              <input
                type="checkbox"
                id="remember"
                className="remember-checkbox"
              />
              <label htmlFor="remember" className="remember-text">
                Remember me
              </label>
            </div>

            <Link href="/forgot-password" className="forgot_text">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button mt">
            Login
          </button>
          <p className="already_account mt">
            Do not have an account?{" "}
            <span>
              <Link href="/signup" className="signin_link">
                Sign Up
              </Link>
            </span>
          </p>
          <p className="creator_text">Createdby Mahpara</p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
