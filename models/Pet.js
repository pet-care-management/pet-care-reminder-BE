const { DataTypes } = require("sequelize")
const db = require("../db")

const Pet = db.define("Pet" , {
    petName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },

    species: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

    breed: {
        type: DataTypes.STRING,
        allowNull: true
    },

    notes: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Pet