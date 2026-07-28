const { DataTypes } = require("sequelize")
const db = require("../db")

const Pet = db.define("Pet" , {

    petId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    petName: {
        type: DataTypes.STRING,
        allowNull: false,
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