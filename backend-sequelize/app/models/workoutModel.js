const sequelize = require('../../config/databese')

const {Model,DataTypes} = require('sequelize')

class Workout extends Model{}

Workout.init({
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    load:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    reps:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    modelName:'wk_Workout'
})

module.exports = Workout