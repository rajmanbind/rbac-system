import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";

// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  // Simulate authentication state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const dispatch = useDispatch();
  const [isData, setIsData] = useState(true);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Add loading state for authentication
  //get user from redux store
  const user = useSelector((state) => state.user.user);
  console.log(user);
  // Authentication state based on user presence
  const isAuthenticated = Boolean(user);

  const getLoggedUser = async () => {
    setIsAuthLoading(true); // Start loading
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/current-user",
        {
          withCredentials: true, // Send cookies
        }
      );

      dispatch(setUserInfo(response.data?.data));
      console.log("User data:", response.data?.data);
      setUserData(response.data?.data);
      setIsData(true);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data?.message || error.message
      );
      dispatch(clearUserInfo());
      setIsData(false);
    } finally {
      setIsAuthLoading(false); // Stop loading after check
    }
  };

  useEffect(() => {
    getLoggedUser();
  }, []);
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
                { path: "/team", element: <Team />, roles: ["Admin","Manager"] },
                {
                  path: "/contacts",
                  element: <Contacts />,
                  roles: ["Manager","Admin"],
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
}

export default App;
