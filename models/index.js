const db = require("../db")
const Reminder = require("./Reminder")
const Pet = require("./Pet")

Pet.hasMany(Reminder, {
    foreignKey: "petId",
    sourceKey: "petId",
    as: "reminders"
})
Reminder.belongsTo(Pet, {
    foreignKey: "petId",
    targetKey: "petId",
    as: "pet"
})

module.exports = {db, Reminder, Pet}