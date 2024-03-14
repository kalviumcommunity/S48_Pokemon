import React, { useEffect, useState } from 'react';
import AddPokemon from './AddPokemons';
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
    
    fetch('http://localhost:3001/getpokemon')
        .then(response => response.json())
        .then(data => {  console.log('Fetched Pokemon data:', data); setPokemon(data)})
        .catch(error => console.error('Error fetching Pokemons:', error));
}, []);

const handleAddPokemon = updatedPokemons => {
  // Update the state with the new list of Pokemon
  setPokemons(updatedPokemons);

};

  return(

    <div>
            <h2>Pokemon</h2>
            <ul>
                {Pokemons.map(Pokemon => (
                     <li key={Pokemon._id} className="pokemon-item">
                     <span className="pokemon-name">{Pokemon.Pokemon_Name}</span>
                     <span className="pokemon-type">{Pokemon.Pokemon_Type}</span>
                     <span className="pokemon-region">{Pokemon.Region}</span>
                   </li>
                ))}
            </ul>
            <AddPokemon onAddPokemon={handleAddPokemon} />
        </div>
    );
};

export default Pokedex;




 
