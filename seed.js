const { db, Reminder, Pet } = require("./models");

async function seed() {
  await db.sync({ force: true });

  const jon = await Pet.create({
    petName: "Jon",
    species: "Dog",
    breed: "Labrador",
    notes: "",
  });

  const charli = await Pet.create({
    petName: "Charli",
    species: "Dog",
    breed: "Beagle",
    notes: "",
  });

  await Reminder.create({
    petId: jon.petId,
    task: "do something",
    notes: "",
    dueDate: new Date(),
    isDone: false,
  });

  await Reminder.create({
    petId: charli.petId,
    task: "walk",
    notes: "",
    dueDate: new Date(),
    isDone: false,
  });

  console.log("Seeded");
  await db.close();
}

seed();
