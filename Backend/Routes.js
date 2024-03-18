const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

// Replace this with your MongoDB connection URI
const uri = "mongodb+srv://rk1942:rishabh1942@cluster0.bnbgo1l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Helper function to retrieve data from MongoDB
async function fetchDataFromMongoDB() {
  try {
    await client.connect();
    const database = client.db("pokedex");
    const collection = database.collection("pokemons");
    return await collection.find().toArray();
  } finally {
    // No need to close the connection immediately; let it be managed elsewhere
  }
}

// CRUD operations

// Read (GET) all items
router.get('/crud/Read', async (req, res) => {
  // Fetch data from MongoDB
  const data = await fetchDataFromMongoDB();
  res.json(data);
});


router.get('/crud/Read/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const database = client.db("pokedex");
    const collection = database.collection("pokemons");
    const pokemon = await collection.findOne({ _id: ObjectId(id) });
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ message: 'Pokemon not found' });
    }
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post('/crud/Create', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("pokedex");
    const collection = database.collection("pokemons");

    // Assuming the request body contains the fields for the new Pokemon
    const newPokemon = req.body;

    const result = await collection.insertOne(newPokemon);
    const insertedPokemon = result.ops[0];

    res.status(201).json(insertedPokemon);
  } catch (error) {
    console.error("Failed to create Pokemon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// Delete (DELETE) an item by ID
router.put('/crud/Update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { Pokemon_Name, Pokemon_Type, Region } = req.body;

    await client.connect();
    const database = client.db("pokedex");
    const collection = database.collection("pokemons");

    const result = await collection.updateOne({ _id: ObjectId(id) }, {
      $set: {
        Pokemon_Name: Pokemon_Name,
        Pokemon_Type: Pokemon_Type,
        Region: Region,
      }
    });

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Pokemon updated successfully' });
    } else {
      res.status(404).json({ message: 'Pokemon not found' });
    }
  } catch (error) {
    console.error("Failed to update Pokemon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete('/crud/Delete/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await client.connect();
    const database = client.db("pokedex");
    const collection = database.collection("pokemons");

    const result = await collection.deleteOne({ _id: ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Pokemon deleted successfully' });
    } else {
      res.status(404).json({ message: 'Pokemon not found' });
    }
  } catch (error) {
    console.error("Failed to delete Pokemon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
