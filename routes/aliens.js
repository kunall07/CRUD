const express = require('express');
const router = express.Router();
const Alien = require('./models/alien'); // Adjust the path to your schema file

// Create a new alien
router.post('/aliens', async (req, res) => {
    try {
        const alien = new Alien(req.body);
        await alien.save();
        res.status(201).send(alien);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Retrieve all aliens
router.get('/aliens', async (req, res) => {
    try {
        const aliens = await Alien.find();
        res.status(200).send(aliens);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update an alien by ID
router.patch('/aliens/:id', async (req, res) => {
    try {
        const alien = await Alien.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!alien) {
            return res.status(404).send();
        }
        res.status(200).send(alien);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an alien by ID
router.delete('/aliens/:id', async (req, res) => {
    try {
        const alien = await Alien.findByIdAndDelete(req.params.id);
        if (!alien) {
            return res.status(404).send();
        }
        res.status(200).send(alien);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;