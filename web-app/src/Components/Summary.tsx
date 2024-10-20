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
import CycleGraph from "./CycleGraph";
import axios from "axios";

interface Cycle {
  //id: number;
  summary: string;
  //score: number;
  cycle: number;
  //pv: number;
  //amt: number;
  //sessionId: number;
}

const Summary: React.FC = () => {
  const [summaries, setSummaries] = useState<Cycle[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Make the API call to Flask backend
    const fetchData = () => {
      axios.get('http://localhost:5000/api/cycles')
        .then((response) => {
          let arr: Cycle[] = response.data.message.map((tuple: any) => ({ summary: tuple[1], cycle: tuple[3]}));
          let rArr = arr.reverse()
          setSummaries(rArr);
        })
        .catch(error => setError(error.message));
    }
    fetchData();
    const interval = setInterval(fetchData, 100);
    return () => clearInterval(interval);
  }, []);
  return (
      <Stack spacing={1} alignItems="flex-start" sx={{ textAlign: "left", mb: "1.5rem"}}>
        <Typography variant="h6">Summary</Typography>
        <Typography variant="body1">
          {summaries.map((item, index) => (
            <div key={index}>
              Cycle {item.cycle}:
              <br />
              {item.summary}
              <br /><br />
              
            </div>
          ))}
        </Typography>
      </Stack>
  );
};
export default Summary;
