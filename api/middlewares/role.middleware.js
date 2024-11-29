const ApiResponse = require("../utils/apiResponse");

const authorizedRole =
  (...allowedRoles) =>
  (req, res, next) => {
    try {
      const userRole = req.user?.role; // Assuming req.user is populated by verifyJWT
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json(ApiResponse(403, { role: req.user?.role }, "Access denied"));
      }
      next();
    } catch (error) {
      console.error("Error in authorizedRole:", error);
      return res
        .status(403)
        .json(ApiResponse(500, null, "Internal server error"));
    }
  };

module.exports = authorizedRole;
