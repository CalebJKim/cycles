import React from 'react';
import ScoreDisplay from './ScoreDisplay';
import ExemplarPersonas from './ExemplarPersonas';
import KeyPainPoints from './KeyPainPoints';
import GraphCard from '../Components/GraphCard';
import { Box, Typography } from '@mui/material';
import Summary from '../Components/Summary';

const SafetyScoreDashboard : React.FC = () => {
  return (
    <Box sx={{ display: "flex", direction: "row", spacing:"10", m: "1rem" }}>
      <Box>
        {/* <GraphCard /> */}
        <ExemplarPersonas />
      </Box>
      <Box>
        {/* <Summary /> */}
      </Box>
    </Box>
  )

}

export default SafetyScoreDashboard;