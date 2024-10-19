import React from 'react';
import ScoreDisplay from './ScoreDisplay';
import ExemplarPersonas from './ExemplarPersonas';
import KeyPainPoints from './KeyPainPoints';

const SafetyScoreDashboard : React.FC = () => {
  return (
    <div className="dashboard">
        <ScoreDisplay />
        <div className="lowerDisplay">
            <ExemplarPersonas />
            <KeyPainPoints />
        </div>
    </div>
  )

}

export default SafetyScoreDashboard;