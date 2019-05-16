const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Subject = sequelize.define('subjects', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hours: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        is_need: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    Subject.associate = function (models) {
        const { User } = models;
        Subject.User = Subject.belongsTo(User, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            },
        });
    };

    return Subject;
};
