const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const HistoryEntry = sequelize.define('history_entry', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score: {
            type: DataTypes.DOUBLE,
            defaultValue: null,
            allowNull: true,
        },
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    HistoryEntry.associate = function (models) {
        const { User, State } = models;
        HistoryEntry.User = HistoryEntry.belongsTo(User, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'user_id',
                allowNull: false,
                unique: 'FOREIGN',
            },
        });
        HistoryEntry.State = HistoryEntry.belongsTo(State, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'state_id',
                allowNull: false,
                unique: 'FOREIGN',
            },
        });
    };

    return HistoryEntry;
};
