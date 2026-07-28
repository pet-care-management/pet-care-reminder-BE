const { db, Reminder } = require("./models");

async function seed() {
    await db.sync({ force: true });

    await Reminder.create({
        petId : 1,
        task : "do something",
        notes : "",
        dueDate : new Date(),
        isDone : false,
    });

    await Reminder.create({
        petId : 2,
        task : "walk",
        notes : "",
        dueDate : new Date(),
        isDone : false,
    });

    console.log("Seeded");
    await db.close();
}

seed()