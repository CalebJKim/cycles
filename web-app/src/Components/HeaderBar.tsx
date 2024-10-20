import React from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Menu from "../Images/Menu.svg"
import Notification from "../Images/Notification.svg"
import Dashboard from "../Images/Dashboard.svg"

const HeaderBar: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="sticky" elevation={0} sx={{ color: "black", backgroundColor: "#f9f9f9" }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", ml: "-2rem", mr: "-2rem" }}>
            <Box sx={{ display: "flex", alignItems: "center"}}>
              <Box component="img" src={Menu}/>
              <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Inter', color: "#283252", mr: -8, ml: 1}}>
                Dashboard
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Inter', color: "#487DE7", textAlign: 'center', flexGrow: 1 }}>
              CrowdMeter
            </Typography>
            <Box>
              <Box component="img" src={Notification} />
            </Box>
            <Box>
              <Box component="img" src={Dashboard} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default HeaderBar;