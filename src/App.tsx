import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Visualizer from './components/Visualizer';
import './styles/main.css';

type View = 'landing' | 'visualizer';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [activeAlgorithmId, setActiveAlgorithmId] = useState<string>('');

  const handleNavigate = (algorithmId: string) => {
    setActiveAlgorithmId(algorithmId);
    setView('visualizer');
  };

  const handleBack = () => {
    setView('landing');
  };

  if (view === 'visualizer') {
    return <Visualizer algorithmId={activeAlgorithmId} onBack={handleBack} />;
  }

  return <LandingPage onNavigate={handleNavigate} />;
};

export default App;
