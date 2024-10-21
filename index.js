const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS
const { mongoURL } = require("./config");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemSchema = new mongoose.Schema({
  token: {
    poolName: String,
    version: String,
    pool: String,
    tokenName: String,
  },
  price: String,
  age: String,
  txns: String,
  volume: String,
  makers: String,
  fiveM: String,
  oneH: String,
  sixH: String,
  twentyH: String,
  liquidity: String,
  mcap: String,
});

const Item = mongoose.model("Item", itemSchema);

// GET endpoint to save data
app.post("/save", async (req, res) => {
  try {
    const items = req.body;

    console.log("a");
    await Item.deleteMany({});
    console.log("123");

    for (let item of items) {
      const newItem = new Item(item); // Assuming data is sent as query parameters
      await newItem.save();
    }

    res.status(201).send("Item saved successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving item: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
