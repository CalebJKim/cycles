import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Home'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HeaderBar from './Components/HeaderBar';
import Uploading from './Components/Uploading'
const App: React.FC = () => {
  

  return (
    <div className="App">
      <Router>
      <HeaderBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Uploading />} />
        </Routes>
    </Router>
      
    </div>
  );
}

export default App;