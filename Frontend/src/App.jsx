import React from 'react';
import './App.css'; // Assuming you're using Create React App, this imports some basic styling.
import Pokedex from './components/LandingPage'; // Adjust the path according to your file structure


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Pokedex />
      </header>
    </div>
  );
}

export default App;