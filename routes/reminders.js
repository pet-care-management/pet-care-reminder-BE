const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder")
const Pet = require("../models/Pet");
const { UPDATE } = require("sequelize/lib/query-types");

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


router.patch("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { task, dueDate, notes } = req.body;
  try {
    const reminder = await Reminder.findByPk(req.params.id)
    if (!reminder) {
        return res.status(404).json({ error: 'Reminder not found' });
    }
   const updatedReminder =  await reminder.update(req.body)
    // Update database record logic here
    res.status(200).json({ message: 'Updated successfully'});
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});
// router.patch("/:id/edit", async (req, res) => {
//     const id = req.params.id
//     const reminder = await Reminder.findByPk(id);
//     if (!reminder) return res.status(404).json({error : "Reminder Not Found"});
//     await reminder.patch();
//     res.sendStatus(204); 
// });

module.exports = router
