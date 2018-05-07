const sequelize = require('./sequelize');

const models = {};

[
    require('./State'),
    require('./User'),
    require('./HistoryEntry'),
].forEach((e) => {
    const model = e(sequelize);
    let modelName = model.name.split('_').map(e => e[0].toUpperCase() + e.slice(1)).join('');
    models[modelName] = model;
});

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

sequelize.sync().then().catch(e => console.error(e));

module.exports = models;
