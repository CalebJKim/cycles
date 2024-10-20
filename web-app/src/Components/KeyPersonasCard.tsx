import React, { useEffect, useState } from 'react';
import Persona from './Persona';
import { Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';

interface Persona {
  title: string;
  description: string;
  imageSrc: string;
  response: string;
  cycle: string;
}

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
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Make the API call to Flask backend
    const fetchData = () => {
      axios.get('http://localhost:5000/api/personas')
        .then((response) => {
          const personasArray: Persona[] = response.data.message.map((tuple: any) => ({

            title: tuple[3],
            cycle: "Cycle " + tuple[2],
            description: tuple[5],
            response: tuple[6],
            imageSrc: "https://i.imgur.com/2alOrqT.jpeg"
          }));
          setPersonas(personasArray);
          
        })
        .catch(error => setError(error.message));
    }
    fetchData();
    const interval = setInterval(fetchData, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper elevation={2} square={false} sx={{width: "95%", p: "1.5rem", margin: "1rem", maxHeight: "42.6%", overflow: "auto", textAlign: "left"}}>
        <Typography variant="h6" sx={{ mb: ".5rem"}}>Key Personas</Typography>
        <Stack spacing={1.5}>
        {
          personas.slice(0, 3).map((persona, index) => (
              <Persona
                id={index}
                imageSrc={persona.imageSrc}
                title={persona.title}
                score={0}
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
