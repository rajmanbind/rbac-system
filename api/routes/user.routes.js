const express = require("express");
const {
  adminAccess,
  managerAccess,
  userAccess,
  getAllUser
} = require("../controllers/user.controller");
const verifyJWT = require("../middlewares/auth.middleware.js");
const authorizedRole = require("../middlewares/role.middleware.js");

const router = express.Router();

router.post("/admin", verifyJWT, authorizedRole("Admin"), adminAccess);
router.post(
  "/manager",
  verifyJWT,
  authorizedRole("Admin", "Manager"),
  managerAccess
);
router.post(
  "/user",
  verifyJWT,
  authorizedRole("Admin", "Manager", "User"),
  userAccess
);

router.get("/getAll-user",verifyJWT,getAllUser)

module.exports = router;
