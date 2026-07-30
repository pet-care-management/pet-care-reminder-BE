const { db, Reminder, Pet } = require("./models");

async function seed() {
  try {
    await db.authenticate();
    console.log('Connected to database.');
 
    // --- Create 5 pets ---
    const pets = await Pet.bulkCreate([
      {
        petName: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        notes: 'Loves belly rubs',
      },
      {
        petName: 'Terror',
        species: 'Dog',
        breed: 'Pug',
        notes: 'Difficulty breathing',
      },
      {
        petName: 'Whiskers',
        species: 'Cat',
        breed: 'Tabby',
        notes: 'Allergic to chicken',
      },
      {
        petName: 'Nibbles',
        species: 'Rabbit',
        breed: 'Holland Lop',
        notes: 'Needs regular nail trims',
      },
      {
        petName: 'Tweety',
        species: 'Bird',
        breed: 'Canary',
        notes: 'Loves seeds',
      },
    ], { returning: true });
 
    console.log(`Created ${pets.length} pets.`);
 
    // Map pet name -> id so we don't have to guess auto-increment values
    const petIdByName = Object.fromEntries(pets.map(p => [p.petName, p.petId ?? p.id]));
 
    // --- Create reminders (at least one per pet, 7 total) ---
    const reminders = await Reminder.bulkCreate([
      {
        petId: petIdByName['Buddy'],
        task: 'Vet Checkup',
        notes: 'Annual wellness exam',
        dueDate: '2026-08-02T15:00:00.000Z',
        isDone: false,
      },
      {
        petId: petIdByName['Buddy'],
        task: 'Grooming Appointment',
        notes: 'Full groom + nail trim',
        dueDate: '2026-08-15T13:00:00.000Z',
        isDone: false,
      },
      {
        petId: petIdByName['Terror'],
        task: 'Evening Walk',
        notes: 'Walk Slow',
        dueDate: '2026-07-30T17:12:00.000Z',
        isDone: false,
      },
      {
        petId: petIdByName['Terror'],
        task: 'Vaccine Booster',
        notes: 'Rabies booster shot',
        dueDate: '2026-08-10T14:00:00.000Z',
        isDone: false,
      },
      {
        petId: petIdByName['Whiskers'],
        task: 'Flea Treatment',
        notes: 'Monthly topical treatment',
        dueDate: '2026-08-05T10:00:00.000Z',
        isDone: false,
      },
      {
        petId: petIdByName['Nibbles'],
        task: 'Nail Trim',
        notes: '',
        dueDate: '2026-07-31T12:00:00.000Z',
        isDone: true,
      },
      {
        petId: petIdByName['Tweety'],
        task: 'Cage Cleaning',
        notes: 'Deep clean + change bedding',
        dueDate: '2026-08-01T09:00:00.000Z',
        isDone: false,
      },
    ]);
 
    console.log(`Created ${reminders.length} reminders.`);
    console.log('Seed complete.');
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    await db.close();
  }
  
}
 
seed();
 