const { db, Reminder } = require("./models");

async function seed() {
    await db.sync({ force: true });

    await Reminder.create({
        petName : "Jon",
        task : "do something",
        notes : "",
        dueDate : new Date(),
        isDone : false,
    });

    await Reminder.create({
        petName : "Charli",
        task : "walk",
        notes : "",
        dueDate : new Date(),
        isDone : false,
    });

    console.log("Seeded");
    await db.close();
}

seed()