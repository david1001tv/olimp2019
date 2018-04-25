const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const HistoryEntry = sequelize.define('history_entry', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        stage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    HistoryEntry.associate = function (models) {
        const { User } = models;
        HistoryEntry.belongsTo(User, {
            onDelete: 'RESTRICT',
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            },
        });
    };

    return HistoryEntry;
};
