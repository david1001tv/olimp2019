const sequelize = require('./sequelize');

const models = {};

[
    require('./HistoryEntry'),
    require('./User'),
].forEach((e) => {
    const model = e(sequelize);
    models[model.name[0].toUpperCase() + model.name.slice(1)] = model;
});

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

sequelize.sync().then().catch(e => console.error(e));

module.exports = models;
