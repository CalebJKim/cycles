import React from 'react';
import '../App.css'; // Import your CSS for styling
import { Avatar, Card, Chip, Stack, Typography } from '@mui/material';

const Persona = (props: { id: number, imageSrc: string, title: string, score: number, description: string }) => {
    // const sentiment = (score: number) => {
    //     if (score > 75) {
    //         return "#87EA94"
    //     } else if (score < 30) {
    //         return "#F67B72"
    //     } else {
    //         return "#F8E4C0"
    //     }
    // }

  return (
    <Card elevation={2} square={false} sx={{width: "95%", p: "1rem", maxHeight:"80%", overflow: "auto", textAlign: "left"}}>
      <Stack direction="row" justifyContent="space-between" sx={{ alignItems: "center", mb: ".5rem" }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: ".5rem" }}>
            <Avatar alt="Remy Sharp" src={props.imageSrc} />
            <Typography variant="body1">{props.title}</Typography>
        </Stack>
        <Chip label={props.score + "%"}/>
      </Stack>
      <Typography variant="body1">{props.description}</Typography>
    </Card>
  );
};

export default Persona;
