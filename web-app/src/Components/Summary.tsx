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
import React, { useEffect, useState } from "react";

const Summary = (props: { numSummaries: number; summaries: { summary: string; score: number; cycle: string; }[]; }) => {
  return (
    <Stack
      spacing={1}
      alignItems="flex-start"
      sx={{ textAlign: "left", mb: "1.5rem" }}
    >
      {props.summaries.slice(0, props.numSummaries).map((item, index) => (
        <Typography variant="body1" key={index}>
          Cycle {item.cycle}: <br />
          {item.summary}
          <br />
          <br />
        </Typography>
      ))}
    </Stack>
  );
};
export default Summary;
