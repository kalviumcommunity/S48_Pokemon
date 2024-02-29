const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const port = process.env.PUBLIC_PORT || 3000;

require('dotenv').config();
const { MongoClient } = require('mongodb');
app.use(express.json());
require('dotenv').config();

const router = require('./Routes.js'); // Import your CRUD routes
app.use(bodyParser.json());

// Use the CRUD routes under the '/crud' endpoint
app.use('/crud', router);

// Ping route for basic server status check
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const uri = process.env.DATABASE_URI;
// Create a new MongoDB client with connection settings
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Home route to check the database connection status
app.get('/', async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();
    
    if (client.topology.isConnected()) {
      // Respond with a JSON indicating that the server is running and the database is connected
      res.json({ message: 'pong', database_status: 'Connected' });
      console.log('Database connected');
    } else {
      // Respond with a JSON indicating that the server is running but the database is disconnected
      res.json({ message: 'pong', database_status: 'Disconnected' });
      console.log('Database disconnected');
    }
  } catch (error) {
    // Handle errors related to MongoDB connection
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    // Consider more specific error handling here based on the error type.
  }
});

if (require.main === module) {
  // Start the server when running this file directly
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;