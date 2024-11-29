import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { tokens } from "../../theme";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true); // Start loading
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Success
      toast.success(response.data.message || "Signup successful!");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      // Error handling
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ToastContainer />
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "white",
          width: "400px",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "20px", color: "black" }}
        >
          Signup
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "5px", color: "black" }}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
            {errors.name && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {errors.name}
              </div>
            )}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px", color: "black" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
            {errors.email && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {errors.email}
              </div>
            )}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "5px", color: "black" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
            {errors.password && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {errors.password}
              </div>
            )}
          </div>
          {/* <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: isLoading ? "#aaa" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </button> */}
          <Button
            type="submit"
            disabled={isLoading}
            sx={{
              backgroundColor: isLoading ? "#aaa" : colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: isLoading ? "#aaa" : colors.blueAccent[800],
              },
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            // startIcon={!isLoading && <DownloadOutlinedIcon />}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </Button>
          <div
            style={{ color: "black", marginTop: "10px", textAlign: "center" }}
          >
            Don't Have Account?{" "}
            <a href="/login" style={{ color: "blue" }}>
              {" "}
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
