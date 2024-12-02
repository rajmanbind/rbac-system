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

const deleteUser = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== "Admin") {
      return res
        .status(403)
        .json(ApiResponse(403, null, "Access denied. Admins only."));
    }

    // Find the user by ID
    const userId = req.params.id; // Ensure you have `id` in the route
    const userToDelete = await User.findById(userId);

    // Check if the user exists
    if (!userToDelete) {
      return res.status(404).json(ApiResponse(404, null, "User not found."));
    }

    // Prevent an admin from deleting another admin
    if (userToDelete.role === "Admin") {
      return res
        .status(403)
        .json(ApiResponse(403, null, "Cannot delete another admin."));
    }

    // Proceed with deletion
    await User.findByIdAndDelete(userId);

    // Fetch all remaining users
    // const allUsers = await User.find();

    return res
      .status(200)
      .json(ApiResponse(200, null, "User deleted successfully."));
  } catch (error) {
    console.error("Error in deleting user:", error);
    return res
      .status(500)
      .json(ApiResponse(500, null, "Internal server error"));
  }
};

module.exports = {
  adminAccess,
  managerAccess,
  userAccess,
  getAllUser,
  deleteUser,
};
