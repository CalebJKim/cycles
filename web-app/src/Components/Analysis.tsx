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

const analysis = [
  {
    point:
      "alksdjflksjdfkj alksdjfk ajlsd flasdjfl kjoiwej wajefojqop jdvkjc,m adf js jqo  pqeo jka kdjflk sw hoe l aioj ef",
  },
  {
    point:
      "alksdjflksjdfkj alksdjfk ajlsd flasdjfl kjoiwej wajefojqop jdvkjc,m adf js jqo  pqeo jka kdjflk sw hoe l aioj ef",
  },
  {
    point:
      "alksdjflksjdfkj alksdjfk ajlsd flasdjfl kjoiwej wajefojqop jdvkjc,m adf js jqo  pqeo jka kdjflk sw hoe l aioj ef",
  },
];

const Analysis: React.FC = () => {
  return (
    <Stack spacing={1} alignItems="flex-start" sx={{ mb: "1.5rem" }}>
      <Typography variant="body1" fontWeight="bold">
        Points to Consider
      </Typography>
      <Stack alignItems="flex-start">
        {
          analysis.map((points, index) => (
            <Stack
                alignItems="flex-start"
                direction="row"
                spacing={2}
                sx={{ textAlign: "left", pl: "1rem", pr: "1rem" }}
                >
                <Typography variant="body2">{index + 1}.</Typography>
                <Typography variant="body2">
                    {points.point}
                </Typography>
                </Stack>
          ))
        }
      </Stack>
    </Stack>
  );
};
export default Analysis;
