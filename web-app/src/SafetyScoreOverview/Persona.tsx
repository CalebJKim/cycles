import React from 'react';
import '../App.css'; // Import your CSS for styling
import { Avatar, Card, Stack, Typography } from '@mui/material';

const Persona = ({ id, imageSrc, title, description }: { id: number; imageSrc: string; title: string; description: string }) => {
  return (
    <Card elevation={2} square={false} sx={{width: "95%", p: "1rem", maxHeight:"80%", overflow: "auto", textAlign: "left"}}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: ".5rem" }}>
        <Avatar alt="Remy Sharp" src={imageSrc} />
        <Typography variant="body1">{title}</Typography>
      </Stack>
      <Typography variant="body1">{description}</Typography>
    </Card>
  );
};

export default Persona;
