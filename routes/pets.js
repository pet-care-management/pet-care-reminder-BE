const express = require("express");
const Pet = require("../models/Pet")
const router = express.Router();

router.get("/", async (req, res) => {
    const allPets = await Pet.findAll();
    res.json(allPets)
})

router.post("/new", async (req, res) => {
    const { petName, species, breed, notes } = req.body

    const newPet = await Pet.create({
        petName,
        species,
        breed,
        notes
    })

    res.status(201).json(newPet)
})

module.exports = router
