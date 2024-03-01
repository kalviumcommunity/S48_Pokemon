import React from 'react';
import '../css/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Pokedex</h1>
      <div className="button-container">
        <button className="login-button">Login</button>
        <button className="signup-button">Signup</button>
      </div>
    </div>
  );
};

export default LandingPage;
