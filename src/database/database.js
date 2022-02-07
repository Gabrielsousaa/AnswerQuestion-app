const sequelize = require("sequelize");
const connection = new sequelize('guiaperguntar', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = connection;