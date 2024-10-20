import { AppBar, Toolbar, Typography } from "@mui/material";
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import './App.css'
// import React from "react";

const HeaderBar : React.FC = () => {
	return (
        <AppBar position='sticky' sx={{ color: "red" }}>
            <Toolbar> 
                <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    CrowdMeter
                </Typography>
            </Toolbar>
        </AppBar>
	);
}
export default HeaderBar;
