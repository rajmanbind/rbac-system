import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme"; // Assuming you're using the token system from your theme
import { useTheme } from "@mui/material/styles";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: colors.primary[400],
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: colors.grey[100],
          marginBottom: "20px",
        }}
      >
        Welcome to the Dashboard
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: colors.grey[200],
          marginBottom: "40px",
        }}
      >
        Use the navigation bar to explore the features of this application. You
        can manage your team, view invoices, and much more.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[600],
            "&:hover": {
              backgroundColor: colors.blueAccent[700],
            },
            color: colors.grey[100],
          }}
          onClick={() => navigate("/team")}
        >
          Manage Team
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.greenAccent[600],
            "&:hover": {
              backgroundColor: colors.greenAccent[700],
            },
            color: colors.grey[100],
          }}
          onClick={() => navigate("/invoices")}
        >
          View Invoices
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.redAccent[600],
            "&:hover": {
              backgroundColor: colors.redAccent[700],
            },
            color: colors.grey[100],
          }}
          onClick={() => navigate("/form")}
        >
          Create a New Form
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[600],
            "&:hover": {
              backgroundColor: colors.blueAccent[700],
            },
            color: colors.grey[100],
          }}
          onClick={() => navigate("/faq")}
        >
          FAQs
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
