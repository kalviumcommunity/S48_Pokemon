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
    const database = client.db("Pokemon");
    const collection = database.collection("pokemon");
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

// Delete (DELETE) an item by ID
router.delete('/Delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    await client.connect();
    const database = client.db("Pokemon");
    const collection = database.collection("pokemon");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      const updatedData = await fetchDataFromMongoDB();
      res.json(updatedData);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } finally {
    // No need to close the connection immediately; let it be managed elsewhere
  }
});

module.exports = router;
