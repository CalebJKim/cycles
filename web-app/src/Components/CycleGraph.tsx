import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from 'react-router-dom';
import Persona from "../SafetyScoreOverview/Persona";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, ResponsiveContainer, Area, Label, ReferenceLine } from 'recharts';

const CycleGraph = (props: {data: { cycle: string; score: number; pv: number; amt: number; }[]}) => {

	return (
        <AreaChart
          width={600}
          height={290}
          data={props.data}
          margin={{
            top: 30,
            right: 30,
            left: 10,
            bottom: 20,
          }}
        >
        <defs>
            <linearGradient id="colorscore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#487DE7" stopOpacity={1}/>
            <stop offset="95%" stopColor="#487DE7" stopOpacity={.4}/>
            </linearGradient>
        </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cycle" label={{value: "Cycles", offset: "-15", position: "insideBottom"}} />
          <YAxis label={{ value: 'Sentiment Analysis', angle: -90, position: 'insideBottomLeft' }} domain={[0, 100]}/>
          <ReferenceLine y={50} label="Neutral Sentiment" strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="score" stroke="#487DE7" fill="url(#colorscore)" />
        </AreaChart>
	);
}
export default CycleGraph;
