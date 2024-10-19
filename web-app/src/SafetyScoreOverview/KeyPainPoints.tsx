import React, { useEffect, useState } from 'react';
import '../App.css'

const painPoints = [
    "example 1",
    "example 2",
    "example 3",
]

const KeyPainPoints: React.FC = () => {
  return (
    <div className="KeyPainPoints">
       <h3>Key Pain Points</h3>
       <ul>
        {painPoints.map((point, index) => (
            <li key={index}>{point}</li>
        ))}
       </ul>
    </div>
  );
}

export default KeyPainPoints;