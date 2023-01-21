const Example = require("../models/Example.js");

// CREATE
const createExample = async (req, res) => {
    try {
        // Create a new example
        console.log("Creating a new example...");
    } catch (error) {
        // Error
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    } finally {
        // Success
        const successMessage = "Successfully created a new example!";
        console.log(successMessage);
        return res.status(200).json({ message: successMessage });
    }
};

// READ
const getExample = async (req, res) => {
    try {
        // Get an example
        console.log("Fetching an example...");
    } catch (error) {
        // Error
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    } finally {
        // Success
        const successMessage = "Successfully got an example!";
        console.log(successMessage);
        return res.status(200).json({ message: successMessage });
    }
};

// UPDATE
const updateExample = async (req, res) => {
    try {
        // Update an example
        console.log("Updating an example...");
    } catch (error) {
        // Error
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    } finally {
        // Success
        const successMessage = "Successfully updated an example!";
        console.log(successMessage);
        return res.status(200).json({ message: successMessage });
    }
};

// DELETE
const deleteExample = async (req, res) => {
    try {
        // Delete an example
        console.log("Deleting an example...");
    } catch (error) {
        // Error
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    } finally {
        // Success
        const successMessage = "Successfully deleted an example!";
        console.log(successMessage);
        return res.status(200).json({ message: successMessage });
    }
};

module.exports = {
    createExample,
    getExample,
    updateExample,
    deleteExample,
};
