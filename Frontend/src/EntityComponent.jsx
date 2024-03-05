import React from 'react';

const EntityComponent = () => {
    // Dummy data related to Pokémon
    const pokemonData = [
        { id: 1, name: 'Pikachu', type: 'Electric' },
        { id: 2, name: 'Bulbasaur', type: 'Grass/Poison' },
        { id: 3, name: 'Charmander', type: 'Fire' },
        // Add more Pokémon data as needed
    ];

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