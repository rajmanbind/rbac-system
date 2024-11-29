const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
connectDB();
const allowedOrigins = ['http://localhost:3000']; // Frontend URL
app.use(express.json()); // To parse JSON
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(
    cors({
      origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
          // Allow requests from the specified origins and allow no-origin (for direct calls from Postman)
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true, // Allow cookies to be sent with requests
    })
  );
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
