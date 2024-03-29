const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const Joi = require('joi');
const { Pokemondata } = require('./Models/Pokemons.js');

const port = process.env.PUBLIC_PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
async function Connection() {
    try {
        await mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to DB");
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

const router = require('./Routes.js');
app.use(bodyParser.json());
app.use('/crud', router);

// Joi schema for Pokemon validation
const pokemonSchema = Joi.object({
    Pokemon_Name: Joi.string().required(),
    Pokemon_Type: Joi.string().required(),
    Region: Joi.string().required()
});

// Route to create a new Pokemon
app.post("/crud/Create", async (req, res) => {
    try {
        // Validate request body against Joi schema
        const { error } = pokemonSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Destructure required fields from request body
        const { Pokemon_Name, Pokemon_Type, Region } = req.body;

        console.log('Adding a new Pokemon...');
        const newPokemon = await Pokemondata.create({
            Pokemon_Name,
            Pokemon_Type,
            Region,
        });

        console.log('New Pokemon added:', newPokemon);
        res.status(201).json(newPokemon);
    } catch (error) {
        console.error("Failed to add Pokemon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to update a Pokemon
app.put('/crud/Update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { Pokemon_Name, Pokemon_Type, Region } = req.body;

        // Check if required fields are provided
        if (!Pokemon_Name || !Pokemon_Type || !Region) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find the Pokemon by id and update its details
        const updatedPokemon = await Pokemondata.findByIdAndUpdate(
            id,
            { Pokemon_Name, Pokemon_Type, Region },
            { new: true }
        );

        if (updatedPokemon) {
            res.status(200).json({ message: 'Pokemon updated successfully', updatedPokemon });
        } else {
            res.status(404).json({ message: 'Pokemon not found' });
        }
    } catch (error) {
        console.error("Failed to update Pokemon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to delete a Pokemon
app.delete('/crud/Delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the Pokemon by id and delete it
        const deletedPokemon = await Pokemondata.findByIdAndDelete(id);

        if (deletedPokemon) {
            res.status(200).json({ message: 'Pokemon deleted successfully', deletedPokemon });
        } else {
            res.status(404).json({ message: 'Pokemon not found' });
        }
    } catch (error) {
        console.error("Failed to delete Pokemon:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to fetch all Pokemons
app.get("/getpokemon", async (req, res) => {
    try {
        console.log('Fetching Pokemons...');
        const Pokemons = await Pokemondata.find({});
        console.log('Fetched Pokemons:', Pokemons);
        res.json(Pokemons);
    } catch (error) {
        console.error("Failed to fetch Pokemons:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to fetch a specific Pokemon by ID
app.get('/crud/Read/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the Pokemon by id
        const pokemon = await Pokemondata.findById(id);

        if (pokemon) {
            res.status(200).json(pokemon);
        } else {
            res.status(404).json({ message: 'Pokemon not found' });
        }
    } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to check the database connection
app.get('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            res.json({ message: 'pong', database_status: 'Connected' });
            console.log('Database connected');
        } else {
            res.json({ message: 'pong', database_status: 'Disconnected' });
            console.log('Database disconnected');
        }
    } catch (error) {
        console.error('Error checking database connection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
Connection().then(() => {
    app.listen(port, () => {
        console.log(`🚀 server running on PORT: ${port}`);
    });
});

module.exports = app;
