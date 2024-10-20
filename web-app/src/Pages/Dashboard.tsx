import React from "react";
import { Box, Typography } from "@mui/material";
import Summary from "../Components/Summary";
import GraphCard from "../Components/GraphCard";
import KeyPersonasCard from "../Components/KeyPersonasCard";
import InfoCard from "../Components/InfoCard";

const Dashboard: React.FC = () => {
  const data = [
    {
      cycle: "Page A",
      score: 100,
      pv: 2400,
      amt: 2400,
    },
    {
      cycle: "Page B",
      score: 50,
      pv: 1398,
      amt: 2210,
    },
    {
      cycle: "Page C",
      score: 75,
      pv: 9800,
      amt: 2290,
    },
    {
      cycle: "Page D",
      score: 20,
      pv: 3908,
      amt: 2000,
    },
    {
      cycle: "Page E",
      score: 10,
      pv: 4800,
      amt: 2181,
    },
    {
      cycle: "Page F",
      score: 95,
      pv: 3800,
      amt: 2500,
    },
    {
      cycle: "Page G",
      score: 20,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <Box sx={{ display: "flex", direction: "row", backgroundColor:"#f9f9f9" }}>
      <Box sx={{ width: "50%" }}>
        <GraphCard score={"80%"} data={data} />
        <KeyPersonasCard />
      </Box>
      <Box sx={{ width: "50%" }}>
        <InfoCard />
      </Box>
    </Box>
  );
};

export default Dashboard;
