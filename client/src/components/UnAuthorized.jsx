import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>403 - Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          color: "white",
          backgroundColor: "#007BFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
