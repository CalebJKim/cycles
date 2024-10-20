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

const GraphBar = (props: {score: string, data: { cycle: string; score: number; pv: number; amt: number; }[]}) => {
    // { id, imageSrc, title, description }: { id: number; imageSrc: string; title: string; description: string }
  return (
    <Paper
      elevation={2}
      square={false}
      sx={{ width: "95%", p: "1.5rem", textAlign: "left", margin: "1rem" }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Sentiment Score</Typography>
        <Typography variant="h4" fontWeight="bold">
          {/* 80% */}
          {props.score}
        </Typography>
      </Stack>
      <CycleGraph data={props.data}/>
    </Paper>
  );
};
export default GraphBar;
