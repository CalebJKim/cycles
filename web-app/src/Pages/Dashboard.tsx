import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Summary from "../Components/Summary";
import GraphCard from "../Components/GraphCard";
import KeyPersonasCard from "../Components/KeyPersonasCard";
import InfoCard from "../Components/InfoCard";
import axios from 'axios'
import SentimentScoreCard from "../Components/InitialSentiment";
import ImprovementsCard from "../Components/ImprovementsCard";


interface Cycle {
  //id: number;
  summary: string;
  score: number;
  cycle: string;
  pv: number;
  amt: number;
  //sessionId: number;
  improvement: string;
}

const Dashboard: React.FC = () => {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [summaries, setSummaries] = useState<Cycle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  useEffect(() => {
    // Make the API call to Flask backend
    const fetchData = () => {
      axios.get('http://localhost:5000/api/cycles')
        .then((response) => {
          const cyclesArray: Cycle[] = response.data.message.map((tuple: any) => ({
            score: tuple[2],
            cycle: "Cycle " + tuple[3],
            pv: 1000,
            amt: 1000,
            improvement: tuple[5],
          }));
          setCycles(cyclesArray);

          let arr: Cycle[] = response.data.message.map((tuple: any) => ({ summary: tuple[1], score: tuple[2], cycle: tuple[3]}));
          let rArr = arr.reverse()
          setSummaries(rArr);

          if (arr.length !== 0) {
            setScore(arr[0].score)
          }
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
        <SentimentScoreCard data={summaries} score = {score}/>
        <KeyPersonasCard />
      </Box>
      <Box sx={{ width: "50%" }}>
        <GraphCard score={"80%"} data={cycles} />
        <ImprovementsCard data={cycles} />
      </Box>
    </Box>
  );
};

export default Dashboard;
