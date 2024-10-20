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
import ScoreIllustration from "../Images/Illustration.svg";

const GraphBar = (props: {
  score: string;
  data: { cycle: string; score: number; pv: number; amt: number; improvement: string }[];
}) => {
  // { id, imageSrc, title, description }: { id: number; imageSrc: string; title: string; description: string }
  return (
    <Paper
      variant="outlined"
      sx={{
        width: "95%",
        p: "1.5rem",
        textAlign: "left",
        margin: "1rem",
        borderRadius: "15px",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Sentiment Evolution
      </Typography>
      <CycleGraph data={props.data} />
    </Paper>
  );
};
export default GraphBar;
