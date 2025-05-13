const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "PassVault";
client.connect();

app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("credentials");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
  
});

app.post("/", async (req, res) => { 
  try {
    const credentials = req.body;
    const db = client.db(dbName);
    const collection = db.collection("credentials");
    const result = await collection.insertOne(credentials);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error inserting document:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete("/", async (req, res) => { 
    const credentials=req.body;
  const db = client.db(dbName);
  const collection = db.collection("credentials");
  const findResult = await collection.deleteOne(credentials)
  res.json({success: true});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
