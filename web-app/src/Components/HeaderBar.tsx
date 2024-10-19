import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";

function ResponsiveAppBar() {

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
export default ResponsiveAppBar;
