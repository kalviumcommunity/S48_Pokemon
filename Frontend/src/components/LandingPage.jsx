import React, { useEffect, useState } from 'react';
import '../css/LandingPage.css';
//const LandingPage = () => {
  //return (
    //<div className="landing-page">
      //<h1>Welcome to Pokedex</h1>
      //<div className="button-container">
       // <button className="login-button">Login</button>
        //<button className="signup-button">Signup</button>
      //</div>
    //</div>
  //);
//};

//export default LandingPage;

const Pokedex = () => {

  const [Pokemons, setPokemon] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:3000/getpokemon')
        .then(response => response.json())
        .then(data => {  console.log('Fetched Pokemon data:', data); setPokemon(data)})
        .catch(error => console.error('Error fetching Pokemons:', error));
}, []);

  return(

    <div>
            <h2>Pokemon</h2>
            <ul>
                {Pokemons.map(Pokemon => (
                    <li key={Pokemon._id}>{Pokemon.Pokemon_Name} ({Pokemon.Pokemon_Type}) ({Pokemon.Region})</li> // Ensure the keys and structure match your database
                ))}
            </ul>
        </div>
    );
};

export default Pokedex;




 
