const express = require('express');
const app = express();
const port = process.env.PUBLIC_PORT || 3000;
const { MongoClient } = require("mongodb");
app.use(express.json())
require("dotenv").config();



app.get('/ping',(req,res)=>{
  res.json({message:'pong'});
});

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology:true,
});


app.get("/", async (req, res) => {
  try {
   
    await client.connect();

   
    if (client.topology.isConnected()) {
      res.json({ message: "pong", database_status: "Connected" });
      console.log("yes");
    } else {
      res.json({ message: "pong", database_status: "Disconnected" });
      console.log("no");
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
    throw err;
  }
});



if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
