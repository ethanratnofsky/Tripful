const express = require("express");

const router = express.Router();

const {
    createExample,
    getExample,
    updateExample,
    deleteExample,
} = require("../controllers/example.controller.js");

router.post("/", createExample); // Create (POST)
router.get("/", getExample); // Read (GET)
router.put("/", updateExample); // Update (PUT)
router.delete("/", deleteExample); // Delete (DELETE)

module.exports = router;
