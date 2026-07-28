const { DataTypes } = require("sequelize");
const db = require("../db") ;

const Reminder = db.define("Reminder", {
    petName : {
        type: DataTypes.STRING,
        allowNull : false,
        validate: { notEmpty: true },
    },
    task : {
        type: DataTypes.STRING,
        allowNull : false,
        validate: { notEmpty: true },
    },
    notes : {
        type: DataTypes.STRING,
        allowNull : true,
    },
    dueDate : {
        type: DataTypes.DATE,
        allowNull : false,
        validate: { notEmpty: true },
    },
    isDone : {
        type: DataTypes.BOOLEAN,
        allowNull : false,
        validate: { notEmpty: true },
    },
});

module.exports = Reminder;