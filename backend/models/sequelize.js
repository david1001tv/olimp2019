const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.dbName, 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    operatorsAliases: false,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    },
    logging: false,
});

module.exports = sequelize;
