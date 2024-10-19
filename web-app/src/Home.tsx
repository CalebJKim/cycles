import React, { useEffect, useState } from 'react';
import SafetyScoreDashboard from './SafetyScoreOverview/SafetyScoreDashboard';
import axios from 'axios';

const Home: React.FC = () => {
    // Define state with TypeScript
  const [apiData, setApiData] = useState<string>('');

  useEffect(() => {
    // Make the API call to Flask backend
    axios.get<{ message: string }>('http://localhost:5000/api/data')
      .then(response => {
        setApiData(response.data.message); // Update the state with the API data
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
         {/* <p>Data from Flask: {apiData}</p> */}
        <SafetyScoreDashboard />
    </div>
  )

}

export default Home;