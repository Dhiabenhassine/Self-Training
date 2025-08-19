const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));

// Set up routes and pass the pool to the routes module
app.use("/api", routes());

// Start the server
app.listen(4000, () => {
  console.log("Server started on port 4000");
});