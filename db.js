const { Sequelize }  = require('sequelize');

const db = new Sequelize ("sewing", "user", "pass", { 
    dialect: "sqlite", 
    storage: "./database.sqlite"
})


  module.exports = db