import React from 'react';
import '../App.css'; // Import your CSS for styling

const Persona = ({ imageSrc, title, description }: { imageSrc: string; title: string; description: string }) => {
  return (
    <div className="info-card">
      <div className="info-card-image">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="info-card-text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Persona;
