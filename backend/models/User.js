const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        google_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        liked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
    return User;
};
