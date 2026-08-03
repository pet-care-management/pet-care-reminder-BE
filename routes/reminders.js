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
                as: "pet",
            },
        ],
    });
    res.json(reminders);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const reminder = await Reminder.findByPk(id, {
        include: [
            {
                model: Pet,
                as: "pet",
            },
        ],
    });
    if (!reminder) return res.status(404).json({error : "Reminder Not Found"});
    res.json(reminder);
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

router.patch("/:id/complete", async (req,res) => {
    const id = req.params.id
    const reminder = await Reminder.findByPk(id);

    if (!reminder) {
        return res.status(404).json({ error: "Reminder Not Found"})
    }

    if (reminder.isDone) {
        return res.json(reminder);
    }

    const isOverdue = new Date(reminder.dueDate) < new Date();

    if (isOverdue) {
        return res.status(400).json({
            error: "Overdue reminders cannot be completed",
        });
    }

    reminder.isDone = true;
    await reminder.save();

    res.json(reminder);
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const reminder = await Reminder.findByPk(id);

    if (!reminder) {
        return res.status(404).json({ error: "Reminder Not Found" });
    }

    const { petId, task, notes, dueDate } = req.body;

    await reminder.update({
        petId,
        task,
        notes,
        dueDate,
    });

    res.json(reminder);
});

module.exports = router
