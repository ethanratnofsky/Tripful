const mongoose = require("mongoose");

const ExampleSchema = new mongoose.Schema({
    exampleField: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model("Example", ExampleSchema, "examples");
