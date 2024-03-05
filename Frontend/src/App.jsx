import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage'
import EntityComponent from './EntityComponent'; 


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/page2" element={<EntityComponent />} />
      </Routes>
    </Router>
  );
};

export default App;