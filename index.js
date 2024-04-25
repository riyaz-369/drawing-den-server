const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("DrawingDev Running");
});

app.listen(port, () => {
  console.log(`DrawingDev running on port ${port}`);
});
