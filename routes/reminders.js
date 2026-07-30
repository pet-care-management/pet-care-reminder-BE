const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder")
const Pet = require("../models/Pet")

router.get("/", async (req, res) => {
    console.log(Reminder)
    const reminders = await Reminder.findAll({
        include: [
            {
                model: Pet,
                as: "pet"
            },
        ],
    });
    res.json(reminders);
});

router.get("/:id", async (req, res) => {
    console.log(Reminder)
    const id = req.params.id
    const reminders = await Reminder.findByPk(id);
    res.json(reminders);
});

router.post("/", async (req, res) => {
    const reminder = await Reminder.create(req.body);
    res.status(201).json(reminder);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const reminder = await Reminder.findByPk(id);
    if (!reminder) return res.status(404).json({error : "Reminder Not Found"});
    await reminder.destroy();
    res.sendStatus(204); 
});

module.exports = router