const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder")

router.get("/", async (req, res) => {
    console.log(Reminder)
    const reminders = await Reminder.findAll();
    res.json(reminders);
});

router.get("/:id", async (req, res) => {
    console.log(Reminder)
    const id = req.params.id
    const reminders = await Reminder.findByPk(id);
    res.json(reminders);
});

module.exports = router