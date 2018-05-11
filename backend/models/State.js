const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const State = sequelize.define('state', {
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
        index: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    State.associate = function (models) {
        const { HistoryEntry } = models;
        State.HistoryEntry = State.hasMany(HistoryEntry, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'state_id',
                allowNull: false,
            },
        });
    };

    return State;
};
