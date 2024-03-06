import React, { useState, useEffect } from 'react';

const EntityComponent = () => {
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        // Fetch Pokémon data from the server
        fetch('http://localhost:3000/Read/')
            .then(response => response.json())
            .then(data => setPokemonData(data))
            .catch(error => console.error('Error fetching Pokémon data:', error));
    }, []); // Empty dependency array ensures the effect runs once when the component mounts

    return (
        <div>
            <h2>Pokémon List</h2>
            <ul>
                {pokemonData.map(pokemon => (
                    <li key={pokemon.id}>
                        {pokemon.name} - Type: {pokemon.type}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EntityComponent;
