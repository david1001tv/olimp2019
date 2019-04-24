const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Coefficients = sequelize.define('coefficients', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        first_proff: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            allowNull: true,
        },
        second_proff: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            allowNull: true,
        },
        third_proff: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    Coefficients.associate = function (models) {
        const {User} = models;
        Coefficients.User = Coefficients.belongsTo(User, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'user_id',
                allowNull: false,
                unique: 'FOREIGN',
            },
        });
    };

    return Coefficients;
};
