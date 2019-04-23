const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Skills = sequelize.define('skills', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        first_skill: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            allowNull: true,
        },
        second_skill: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            allowNull: true,
        },
        third_skill: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    Skills.associate = function (models) {
        const {User} = models;
        Skills.User = Skills.belongsTo(User, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'user_id',
                allowNull: false,
                unique: 'FOREIGN',
            },
        });
    };

    return Skills;
}