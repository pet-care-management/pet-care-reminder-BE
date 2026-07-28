const { db, Reminder, Pet} = require("./models");



async function seed() {
    await db.sync({ force: true });

    await Pet.create({
      petName: "Jon",
      species: "Dog",
      breed: "Labrador",
      notes: "",
    });

    await Pet.create({
      petName: "Charli",
      species: "Dog",
      breed: "Beagle",
      notes: "",
    });

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