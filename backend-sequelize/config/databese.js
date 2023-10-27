const {Sequelize} = require('sequelize')

const db = {
    name:process.env.DB_NAME,
    user:process.env.DB_USER,
    pass:process.env.DB_PASS,
    options:{
       port: process.env.DB_PORT,
       host: process.env.DB_HOST,
       dialect:'mysql'
    }
}

const sequelize = new Sequelize(db.name, db.user, db.pass, db.options);

module.exports = sequelize