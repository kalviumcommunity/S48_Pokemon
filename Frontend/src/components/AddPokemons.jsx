import React, { useEffect, useState } from 'react';

const AddPokemon = ({ onAddPokemon }) => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonType, setPokemonType] = useState('');
  const [region, setRegion] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    // Make a POST request to add the entity
    const response = await fetch('http://localhost:3001/crud/Create', {
      method: 'POST',
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
      console.error('Failed to submit data');
      return;
    }

    // Parse and set the API response
    const data = await response.json();

    // Notify the parent component about the added Pokemon
    onAddPokemon(data);

    // Reset form fields
    setPokemonName('');
    setPokemonType('');
    setRegion('');
  };

  return (
    <div>
      <h2>Add Pokemon</h2>
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
        <button type="submit">Add Pokemon</button>
      </form>
    </div>
  );
};

export default AddPokemon;
