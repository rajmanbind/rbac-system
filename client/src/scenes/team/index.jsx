import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoading, setIsLoading] = useState(true);
  // /getAll-user
  const [userData, setUserData] = useState([]);
  const getAllUser = async () => {
    setIsLoading(true);
    try {
      // Make API call to login
      const response = await axios.get(
        "http://localhost:5000/api/users/getAll-user", // Adjust endpoint as needed

        {
          withCredentials: true, // Send cookies with the request
        }
      );

      // Success response
      console.log("Users:", response.data?.data?.users);
      setUserData(
        response.data?.data?.users.map((d,index) => {
          return {
            id: d.name+"_"+index,
            name: d.name,
            email: d.email,
            access: d.role,
          };
        })
      );
      console.log(response.data);
    } catch (error) {
      // Error response
      if (error.response) {
        // Backend returned an error response
        console.error(error.response.data.message || "Something went wrong!");
      } else {
        // Network or other errors
        console.error("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop the loading spinner
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    //   flex: 1,
    // },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "Admin"
                ? colors.greenAccent[600]
                : access === "Manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "Manager" && <SecurityOutlinedIcon />}
            {access === "User" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
  useEffect(() => {
    getAllUser();
  }, []);

  if (isLoading) {
    // Show a loading spinner or placeholder while authentication is being verified
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {userData.length > 0 && (
          <DataGrid checkboxSelection rows={userData} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default Team;
