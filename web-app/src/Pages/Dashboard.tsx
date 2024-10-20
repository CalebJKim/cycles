import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Summary from "../Components/Summary";
import GraphCard from "../Components/GraphCard";
import KeyPersonasCard from "../Components/KeyPersonasCard";
import InfoCard from "../Components/InfoCard";
import axios from 'axios'
import SentimentScoreCard from "../Components/InitialSentiment";


interface Cycle {
  //id: number;
  //summary: string;
  score: number;
  cycle: string;
  pv: number;
  amt: number;
  //sessionId: number;
}

const Dashboard: React.FC = () => {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Make the API call to Flask backend
    const fetchData = () => {
      axios.get('http://localhost:5000/api/cycles')
        .then((response) => {
          const cyclesArray: Cycle[] = response.data.message.map((tuple: any) => ({
            score: tuple[2],
            cycle: "Cycle " + tuple[3],
            pv: 1000,
            amt: 1000
          }));
          setCycles(cyclesArray);
        })
        .catch(error => setError(error.message));
    }
    fetchData();
    const interval = setInterval(fetchData, 100);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Box sx={{ display: "flex", direction: "row", backgroundColor:"#f9f9f9" }}>
      <Box sx={{ width: "50%" }}>
        <GraphCard score={"80%"} data={cycles} />
      
        <SentimentScoreCard score = {20} fullText = "This is just placeholder text. This is just placeholder text.This is just placeholder text.This is just placeholder text.This is just placeholder text.This is just placeholder text.This is just placeholder text.This is just placeholder text."/>
        <KeyPersonasCard />
      </Box>
      <Box sx={{ width: "50%" }}>
        <GraphCard score={"80%"} data={cycles} />
        <InfoCard />
      </Box>
    </Box>
  );
};

export default Dashboard;
