import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Persona from "../SafetyScoreOverview/Persona";

const HeaderBar: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="sticky" elevation={0} sx={{color:"black", backgroundColor:"#f9f9f9"}}>
        <Container maxWidth="xl">
          <Toolbar sx={{ direction: "row", justifyContent: "space-between", ml:"-2rem", mr:"-2rem"}}>
            <Typography variant="h6" fontWeight="bold">CrowdMeter</Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/persona">
                Upload Media
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default HeaderBar;
