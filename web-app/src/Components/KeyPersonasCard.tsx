import React from 'react';
import Persona from './Persona';
import { Paper, Stack, Typography } from '@mui/material';

const personaData = [
    { 
      imageSrc: "https://i.imgur.com/2alOrqT.jpeg",
      title: "Cool Cat 1",
      score: 50,
      description: "This cat knows what's up!"
    },
    {
      imageSrc: "https://i.imgur.com/2alOrqT.jpeg",
      title: "Cool Cat 2",
      score: 30,
      description: "I love cats"
    },
    {
      imageSrc: "https://i.imgur.com/2alOrqT.jpeg",
      title: "Cool Cat 3",
      score: 75,
      description: "Wait there's even more :O"
    }
  ];

const KeyPersonasCard = () => {

  return (
    <Paper elevation={2} square={false} sx={{width: "95%", p: "1.5rem", margin: "1rem", maxHeight: "42.6%", overflow: "auto", textAlign: "left"}}>
        <Typography variant="h6" sx={{ mb: ".5rem"}}>Key Personas</Typography>
        <Stack spacing={1.5}>
        {
          personaData.map((persona, index) => (
              <Persona
                id={index}
                imageSrc={persona.imageSrc}
                title={persona.title}
                score={persona.score}
                description={persona.description}
              />
          ))
        }
        </Stack>
        {/* </Stack> */}
    </Paper>
  );
}


export default KeyPersonasCard;
