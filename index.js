const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER}:${process.env.USER_PASS}@cluster0.308otot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const usersCollections = client.db("usersDB").collection("users");
    const artAndCraftCollection = client
      .db("artAndCraftDB")
      .collection("art and crafts");

    app.get("/users", async (req, res) => {
      const cursor = usersCollections.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const users = req.body;
      const result = await usersCollections.insertOne(users);
      res.send(result);
    });

    // art and craft related APIs

    app.get("/crafts", async (req, res) => {
      const cursor = artAndCraftCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/crafts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await artAndCraftCollection.findOne(query);
      res.send(result);
    });

    app.post("/crafts", async (req, res) => {
      const crafts = req.body;
      const result = await artAndCraftCollection.insertOne(crafts);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("DrawingDen Running");
});

app.listen(port, () => {
  console.log(`DrawingDev running on port ${port}`);
});
