import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.js";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo, setUserInfo } from "./features/userSlice.js";
import axios from "axios";
import Unauthorized from "./components/UnAuthorized.jsx";

const App = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Loading state for authentication
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirecting
  const user = useSelector((state) => state.user.user);
  const [theme, colorMode] = useMode();
  // Determine if the user is authenticated
  const isAuthenticated = Boolean(user);

  const getLoggedUser = async () => {
    setIsAuthLoading(true); // Start loading
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/current-user",
        { withCredentials: true } // Send cookies
      );

      // If user is authenticated, update the Redux store
      dispatch(setUserInfo(response.data?.data));
      console.log("User data:", response.data?.data);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data?.message || error.message
      );

      // Handle access token expiration
      if (error.response?.data?.message === "jwt expired") {
        // toast.error("token expired")
        try {
          // Attempt to refresh the tokens
          const refreshResponse = await axios.post(
            "http://localhost:5000/api/auth/refresh-token",
            {},
            { withCredentials: true } // Send cookies
          );

          console.log("Tokens refreshed successfully");
          // Retry fetching user data after refreshing tokens
          const retryResponse = await axios.get(
            "http://localhost:5000/api/auth/current-user",
            { withCredentials: true }
          ) ;

          // Update Redux store with new user data
          dispatch(setUserInfo(retryResponse.data?.data));
          console.log("User data after refresh:", retryResponse.data?.data);
        } catch (refreshError) {
          console.error(
            "Error refreshing tokens:",
            refreshError.response?.data?.message || refreshError.message
          );

          // If both tokens are expired, clear the user info and redirect to login
          if (
            refreshError.response?.data?.message === "jwt expired"
          ) {
            console.error("Both tokens have expired. Redirecting to login...");
            dispatch(clearUserInfo());
            navigate("/login"); // Redirect to login page
          }
          else{
            toast.error("something went wrong!")
          }
        }
      } else {
        // Other errors
        console.log("Unhandled error:", error.response?.data);
        toast.error("something went wrong!")
        dispatch(clearUserInfo());
        navigate("/login"); // Redirect to login page
      }
    } finally {
      setIsAuthLoading(false); // Stop loading after checks
    }
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect unauthenticated users to login
    }
  }, [isAuthenticated, navigate]);

  if (isAuthLoading) {
    // Show a loading spinner or placeholder while authentication is being verified
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ToastContainer/>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isAuthenticated && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              {/* Public Routes */}
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/signup"
                element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
              />
              <Route path="/unauthorized" element={<Unauthorized />} />
              {/* Protected Routes */}
              {[
                {
                  path: "/",
                  element: <Dashboard />,
                  roles: ["Admin", "Manager", "User"],
                },
                {
                  path: "/team",
                  element: <Team />,
                  roles: ["Admin", "Manager"],
                },
                {
                  path: "/contacts",
                  element: <Contacts />,
                  roles: ["Manager", "Admin"],
                },
                {
                  path: "/invoices",
                  element: <Invoices />,
                  roles: ["Admin", "Manager"],
                },
                {
                  path: "/form",
                  element: <Form />,
                  roles: ["Admin", "Manager"],
                },
                { path: "/faq", element: <FAQ />, roles: ["Manager", "User"] },
              ].map(({ path, element, roles }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      roles={roles}
                      userRole={user?.role || "User"}
                    >
                      {element}
                    </PrivateRoute>
                  }
                />
              ))}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
