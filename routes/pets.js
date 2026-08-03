const express = require("express");
const Pet = require("../models/Pet")
const Reminder = require("../models/Reminder")
const router = express.Router();

router.get("/", async (req, res) => {
    const allPets = await Pet.findAll();
    res.json(allPets)
})

router.get("/:id", async (req,res) => {
    const id = req.params.id;

    const pet = await Pet.findByPk(id, {
        include: [
            {
                model:Reminder,
                as : "reminders",
            },
        ],
    });

    if(!pet){
        return res.status(404).json({ error: "Pet not found"});
    }

    res.json(pet);

});

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
