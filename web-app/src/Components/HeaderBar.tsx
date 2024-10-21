import React from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import Menu from "../Images/Menu.svg";
import Notification from "../Images/Notification.svg";
import DashboardIcon from "../Images/Dashboard.svg";
import UploadIcon from "../Images/Upload.svg";

const HeaderBar: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ color: "black", backgroundColor: "#f9f9f9" }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{ justifyContent: "space-between", ml: "-2rem", mr: "-2rem" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                src={Menu}
                sx={{ mt: "0.35rem", width: 24, height: 24 }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  mt: "0.35rem",
                  fontFamily: "Inter",
                  color: "#283252",
                  ml: 1,
                }}
              >
                Dashboard
              </Typography>
            </Box>
            <Typography
              color="inherit"
              variant="h6"
              sx={{
                mt: "0.8rem",
                mr: -0.2,
                fontFamily: "Inter",
                fontWeight: "bold",
                color: "#487DE7",
                textAlign: "center",
              }}
            >
              marketmind
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button color="inherit" component={Link} to="/upload">
                <Box
                  component="img"
                  src={UploadIcon}
                  sx={{ width: 18, height: 18, mr: 0, mt: 0.15 }}
                />
              </Button>
              <Box
                component="img"
                src={Notification}
                sx={{ width: 24, height: 24, mr: 2 }}
              />
              <Button color="inherit" component={Link} to="/">
                <Box
                  component="img"
                  src={DashboardIcon}
                  sx={{ width: 24, height: 24, mr: 2 }}
                />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default HeaderBar;

{
  /* <Box sx={{ display: { xs: "none", sm: "block" } }}>
  <Button color="inherit" component={Link} to="/">
    Home
  </Button>
  <Button color="inherit" component={Link} to="/upload">
    Upload Media
  </Button>
</Box> */
}
