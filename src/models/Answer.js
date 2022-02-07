const Sequelize = require('sequelize');
const connection = require('../database/database');

const Answer = connection.define('answers', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})

Answer.sync({ force: false }).then(() => {
    console.log("Table... created sucessfull! ")
}).catch(err => {
    console.log(err);
})

module.exports = Answer;