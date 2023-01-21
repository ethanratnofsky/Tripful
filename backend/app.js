const express = require("express");
const cors = require("cors");

const connectMongoDB = require("./config/mongodb.js");

const PORT = 3000;

const app = express();

connectMongoDB(); // Connect to MongoDB

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Routers
app.use("/example", require("./routes/example.router.js"));

app.get("/", (req, res) => {
    res.send("Nice! You've reached the backend! 😎");
});

app.listen(PORT, () => {
    console.log(`Express server is listening on port ${PORT}!`);
});
