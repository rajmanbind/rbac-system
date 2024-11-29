const express = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  forgotPassword,
} = require("../controllers/auth.controller.js");
const verifyJWT = require("../middlewares/auth.middleware.js");
const router = express.Router();



router.post("/register", registerUser);
router.post("/login", loginUser);


//secured routes
router.post("/logout", verifyJWT,logoutUser);


router.post("/refresh-token",refreshAccessToken);
router.post("/change-password",verifyJWT, changeCurrentPassword)
router.get("/current-user",verifyJWT, getCurrentUser)
router.get("/forgot-password",verifyJWT, forgotPassword)
router.patch("/update-account",verifyJWT, updateAccountDetails)


module.exports = router;
