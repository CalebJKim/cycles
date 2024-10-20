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
import Analysis from "./Analysis";
import Summary from "./Summary";
import ImprovementsCard from "./ImprovementsCard";

const InfoCard: React.FC = () => {
  return (
    <Paper
      elevation={2}
      square={false}
      sx={{
        width: "95%",
        p: "1.5rem",
        margin: "1rem",
        minHeight: "86%",
        maxHeight: "86%",
        overflow: "auto",
        textAlign: "left",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Report
      </Typography>
      {/* <Summary numSummaries={1} /> */}
      {/* <Analysis /> */}
      {/* <ImprovementsCard /> */}
    </Paper>
  );
};
export default InfoCard;
