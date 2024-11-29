import {
  Box,
  IconButton,
  useTheme,
  MenuItem,
  ClickAwayListener,
  Popper,
  Paper,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import { clearUserInfo } from "../../features/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const handleMenuOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle dropdown state
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the dropdown
  };

  const navigate = useNavigate();

const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(clearUserInfo());
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true, // Send cookies
        }
      );
      // Success
      toast.success(response.data.message || "Logout successful!");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful signup
      }, 2500);
    } catch (error) {
      // Error handling
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{background: `${colors.primary[400]} !important`,}}>
      {/* SEARCH BAR */}
      <ToastContainer />
      <Box
        display="flex"
        // backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>
        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="bottom-end"
          disablePortal={false} // Ensures Popper renders in the portal to handle stacking
          modifiers={[
            {
              name: "zIndex",
              enabled: true,
              options: {
                zIndex: 2000, // Set a high z-index value
              },
            },
          ]}
          sx={{
            zIndex: 2000, // Directly set z-index here for compatibility
            color: "black",
          }}
        >
          <ClickAwayListener onClickAway={handleMenuClose}>
            <Paper
              sx={{
                mt: 1,
                minWidth: 150,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Box>
    </Box>
  );
};

export default Topbar;
