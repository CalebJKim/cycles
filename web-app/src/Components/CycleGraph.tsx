import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from 'react-router-dom';
import Persona from "../SafetyScoreOverview/Persona";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, ResponsiveContainer, Area, Label } from 'recharts';

const CycleGraph = (props: {data: { cycle: string; score: number; pv: number; amt: number; }[]}) => {

	return (
        <AreaChart
          width={600}
          height={230}
          data={props.data}
          margin={{
            top: 30,
            right: 30,
            left: 0,
            bottom: 20,
          }}
        >
        <defs>
            <linearGradient id="colorscore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#87EA94" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="87EA94" stopOpacity={0}/>
            </linearGradient>
        </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cycle">
            <Label value="Cycles" offset={-15} position="insideBottom" />
          </XAxis>
          <YAxis label={{ value: 'sentiment', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <Area type="monotone" dataKey="score" stroke="#87EA94" fill="url(#colorscore)" />
        </AreaChart>
	);
}
export default CycleGraph;
