const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Choice = sequelize.define('choice', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        friend: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: false,
        },
        magistracy: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: false,
        },
        science: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: false,
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: false,
            default: '',
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    Choice.associate = function (models) {
        const { User } = models;
        Choice.User = Choice.belongsTo(User, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            },
        });
    };

    return Choice;
};
