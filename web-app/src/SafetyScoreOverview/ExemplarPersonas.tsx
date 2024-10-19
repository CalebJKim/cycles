import React, { useEffect, useState } from 'react';
import Persona from './Persona';
import '../App.css'

const ExemplarPersonas: React.FC = () => {
  return (
    <div className="ExemplarPersonas">
        <Persona
            imageSrc={require('./cat.jpg')} 
            title="Cool Cat"
            description="This cat knows what's up!" />
    </div>
  );
}

export default ExemplarPersonas;