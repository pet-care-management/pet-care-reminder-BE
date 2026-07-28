const db = require("../db")
const Reminder = require("./Reminder")
const Pet = require("./Pet")
// 

Pet.hasMany(Reminder, {
    foreignKey: "petName",
    sourceKey: "petName",
    as: "reminders"
})
Reminder.belongsTo(Pet, {
    foreignKey: "petName",
    targetKey: "petName",
    as: "pet"
})

module.exports = {db, Reminder, Pet}