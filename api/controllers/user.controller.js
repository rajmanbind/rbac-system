const ApiResponse = require("../utils/apiResponse");
const User = require("../models/user.model.js");
// Admin Access Handler
const adminAccess = async (req, res) => {
  try {
    return res
      .status(200)
      .json(ApiResponse(200, { role: req.user.role }, "Admin has access!"));
  } catch (error) {
    console.error("Error in adminAccess:", error);
    return res
      .status(500)
      .json(ApiResponse(500, null, "Internal server error"));
  }
};

// Manager Access Handler
const managerAccess = async (req, res) => {
  try {
    return res
      .status(200)
      .json(ApiResponse(200, { role: req.user.role }, "Manager has access!"));
  } catch (error) {
    console.error("Error in managerAccess:", error);
    return res
      .status(500)
      .json(ApiResponse(500, null, "Internal server error"));
  }
};

// User Access Handler
const userAccess = async (req, res) => {
  try {
    return res
      .status(200)
      .json(ApiResponse(200, { role: req.user.role }, "User has access!"));
  } catch (error) {
    console.error("Error in userAccess:", error);
    return res
      .status(500)
      .json(ApiResponse(500, null, "Internal server error"));
  }
};

const getAllUser = async (req, res) => {
  try {
    if (req.user.role === "Admin" || req.user.role === "Manager") {
      const allUser = await User.find();
      return res
        .status(200)
        .json(ApiResponse(200, { users: allUser }, "User has access!"));
    } else {
      return res.status(401).json(ApiResponse(401, null, "Don't have access"));
    }
  } catch (error) {
    console.error("Error in userAccess:", error);
    return res
      .status(500)
      .json(ApiResponse(500, null, "Internal server error"));
  }
};

module.exports = { adminAccess, managerAccess, userAccess, getAllUser };
