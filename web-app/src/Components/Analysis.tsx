import {
  AppBar,
  Avatar,
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

const Analysis = (props: {
  numPoints: number;
  truncate: { };
  data: { cycle: string; score: number; pv: number; amt: number; improvement: string }[];
}) => {
  return (
    <Stack spacing={1} alignItems="flex-start" sx={{ mb: "1.5rem" }}>
      <Stack alignItems="flex-start" spacing={2}>
        {props.data.slice(0, props.numPoints).map((points, index) => (
          <Stack
            alignItems="flex-start"
            direction="row"
            spacing={2}
            sx={{ textAlign: "left", pl: "1rem", pr: "1rem" }}
          >
            <Typography
              variant="body2"
              sx={{
                border: 1,
                borderColor: "#F3F3F3",
                backgroundColor: "#F3F3F3",
                p: ".2rem",
                pl: ".6rem",
                pr: ".6rem",
                borderRadius: "50%",
                textAlign: "center",
              }}
            >
              {index + 1}
            </Typography>
            <Typography
              variant="body2"
            //   noWrap={props.truncate}
              sx={props.truncate}
            >
              {points.improvement}{" "}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
export default Analysis;
