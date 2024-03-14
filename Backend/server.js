const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const Pokemondata = require('./Models/Pokemons.js');

const port = process.env.PUBLIC_PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


app.post("/crud/Create", async (req, res) => {
    try {
      const { Pokemon_Name, Pokemon_Type, Region } = req.body;
  
      if (!Pokemon_Name || !Pokemon_Type || !Region) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
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
  



Connection().then(() => {
    app.listen(port, () => {
        console.log(`🚀 server running on PORT: ${port}`);
    });
});

module.exports = app;
