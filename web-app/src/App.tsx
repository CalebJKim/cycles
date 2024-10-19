import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Home'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
const App: React.FC = () => {
  

  return (
    <div className="App">
      <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
      
    </div>
  );
}

export default App;