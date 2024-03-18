import React, { useEffect, useState } from 'react';
import '../css/UpdatePokemons.css';

const UpdatePokemon = ({ onUpdatePokemon, onDeletePokemon, pokemonId }) => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonType, setPokemonType] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    if (!pokemonId) return; // Exit early if pokemonId is not available

    // Fetch the details of the existing Pokemon to update
    fetch(`http://localhost:3001/crud/Read/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        setPokemonName(data.Pokemon_Name);
        setPokemonType(data.Pokemon_Type);
        setRegion(data.Region);
      })
      .catch(error => console.error('Error fetching Pokemon details:', error));
  }, [pokemonId]);

  const handleSubmit = async event => {
    event.preventDefault();

    // Make a PUT request to update the entity
    const response = await fetch(`http://localhost:3001/crud/Update/${pokemonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Pokemon_Name: pokemonName,
        Pokemon_Type: pokemonType,
        Region: region,
      }),
    });

    if (!response.ok) {
      console.error('Failed to update Pokemon');
      return;
    }

    // Notify the parent component about the updated Pokemon
    onUpdatePokemon();

    // Reset form fields
    setPokemonName('');
    setPokemonType('');
    setRegion('');
  };

  const handleDelete = async () => {
    // Make a DELETE request to delete the entity
    const response = await fetch(`http://localhost:3001/crud/Delete/${pokemonId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error('Failed to delete Pokemon');
      return;
    }

    // Notify the parent component about the deleted Pokemon
    onDeletePokemon();
  };

  return (
    <div>
      <h2>Update Pokemon</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pokemon Name:
          <input type="text" value={pokemonName} onChange={e => setPokemonName(e.target.value)} required />
        </label>
        <br />
        <label>
          Pokemon Type:
          <input type="text" value={pokemonType} onChange={e => setPokemonType(e.target.value)} required />
        </label>
        <br />
        <label>
          Region:
          <input type="text" value={region} onChange={e => setRegion(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Update Pokemon</button>
        <button type="button" onClick={handleDelete}>Delete Pokemon</button>
      </form>
    </div>
  );
};

export default UpdatePokemon;
