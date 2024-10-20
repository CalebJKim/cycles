import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Home'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HeaderBar from './Components/HeaderBar';
import Persona from './SafetyScoreOverview/Persona';
const App: React.FC = () => {
  

  return (
    <div className="App">
      <Router>
      <HeaderBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/persona" element={<Persona id={0} imageSrc={''} title={''} description={''} />} />
        </Routes>
    </Router>
      
    </div>
  );
}

export default App;