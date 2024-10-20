import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import CycleGraph from "./CycleGraph";

const Summary: React.FC = () => {
  return (
      <Stack spacing={1} alignItems="flex-start" sx={{ textAlign: "left", mb: "1.5rem"}}>
        <Typography variant="h6">Summary</Typography>
        <Typography variant="body1">
          lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
          ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
          ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
          ipsumlorem ipsumlorem{" "}
        </Typography>
      </Stack>
  );
};
export default Summary;
