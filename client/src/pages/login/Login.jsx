import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { setUserInfo } from "../../features/userSlice";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
    setIsLoading(true);
    try {
      // Make API call to login
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", // Adjust endpoint as needed
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Send cookies with the request
        }
      );

      // Success response
      toast.success(response.data.message || "Login successful!");
      console.log("Logged in user:", response.data.data.user);

      console.log(response.data?.data?.user);
      dispatch(setUserInfo(response?.data?.data?.user)); // Set Redux state
      setTimeout(() => {
        navigate("/"); // Redirect to the home page
      }, 2500);
    } catch (error) {
      // Error response
      if (error.response) {
        // Backend returned an error response
        toast.error(error.response.data.message || "Something went wrong!");
      } else {
        // Network or other errors
        toast.error("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop the loading spinner
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
          Login
        </h2>

        <form onSubmit={handleSubmit}>
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
            {isLoading ? "Signing..." : "Sign In"}
          </Button>
          <div
            style={{ color: "black", marginTop: "10px", textAlign: "center" }}
          >
            Allready Have Account?
            <a href="/signup" style={{ color: "blue" }}>
              Signp Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
