import React, { useEffect, useState } from 'react';
import AddPokemon from './AddPokemons';
import UpdatePokemon from './UpdatePokemons'; // Import the UpdatePokemon component
import '../css/LandingPage.css';

const Pokedex = () => {
  const [Pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Track the selected Pokemon for update/delete

  useEffect(() => {
    fetch('http://localhost:3001/getpokemon')
      .then(response => response.json())
      .then(data => { 
        console.log('Fetched Pokemon data:', data); 
        setPokemons(data);
      })
      .catch(error => console.error('Error fetching Pokemons:', error));
  }, []);

  const handleAddPokemon = updatedPokemons => {
    setPokemons(updatedPokemons);
  };

  const handleUpdatePokemon = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3001/crud/Update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        // Update the Pokemon data locally
        const updatedPokemons = Pokemons.map(pokemon => {
          if (pokemon._id === id) {
            return { ...pokemon, ...updatedData };
          }
          return pokemon;
        });
        setPokemons(updatedPokemons);
      } else {
        console.error('Failed to update Pokemon:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating Pokemon:', error);
    }
  };

  const handleDeletePokemon = async id => {
    try {
      const response = await fetch(`http://localhost:3001/crud/Delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted Pokemon from the local state
        const updatedPokemons = Pokemons.filter(pokemon => pokemon._id !== id);
        setPokemons(updatedPokemons);
      } else {
        console.error('Failed to delete Pokemon:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting Pokemon:', error);
    }
  };

  const handleUpdateClick = pokemon => {
    setSelectedPokemon(pokemon._id); // Set the selected Pokemon's ID
  };

  return (
    <div>
      <h1>Welcome to Pokedex</h1>
      <div className="pokedex-container">
        <div className="pokemon-table">
          <div className="pokemon-table-header">Name</div>
          <div className="pokemon-table-header">Type</div>
          <div className="pokemon-table-header">Region</div>
          <div className="pokemon-table-header">Actions</div> {/* Add a column for actions */}
          {Pokemons.map(Pokemon => (
            <React.Fragment key={Pokemon._id}>
              <div className="pokemon-table-data">
                <span className="pokemon-name">{Pokemon.Pokemon_Name}</span>
              </div>
              <div className="pokemon-table-data">
                <span className="pokemon-type">{Pokemon.Pokemon_Type}</span>
              </div>
              <div className="pokemon-table-data">
                <span className="pokemon-region">{Pokemon.Region}</span>
              </div>
              <div className="pokemon-table-data">
                {/* Update and delete buttons */}
                <button onClick={() => handleUpdateClick(Pokemon)}>Update</button>
                <button onClick={() => handleDeletePokemon(Pokemon._id)}>Delete</button>
              </div>
            </React.Fragment>
          ))}
        </div>
        <AddPokemon onAddPokemon={handleAddPokemon} />
        {selectedPokemon && (
          <UpdatePokemon
            pokemonId={selectedPokemon}
            onUpdatePokemon={handleUpdatePokemon}
            onDeletePokemon={handleDeletePokemon}
          />
        )} {/* Pass pokemonId prop and update/delete functions */}
      </div>
    </div>
  );
};

export default Pokedex;
