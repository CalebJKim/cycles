import React from 'react';
import Persona from './Persona';
import '../App.css'

const personaData = [
    { 
      imageSrc: "https://i.imgur.com/2alOrqT.jpeg",
      title: "Cool Cat 1",
      description: "This cat knows what's up!"
    },
    {
      imageSrc: "https://i.imgur.com/2alOrqT.jpeg",
      title: "Cool Cat 2",
      description: "I love cats"
    },
    {
      imageSrc: "https://i.imgur.com/2alOrqT.jpeg",
      title: "Cool Cat 3",
      description: "Wait there's even more :O"
    }
  ];

const ExemplarPersonas: React.FC = () => {
  return (
    <div className="scroll-container">
      {
        personaData.map((persona, index) => (
          <div key={index} className="persona-wrapper">
            <Persona
              id={index}
              imageSrc={persona.imageSrc}
              title={persona.title}
              description={persona.description}
            />
          </div>
        ))
      }
    </div>
  );
}

export default ExemplarPersonas;
