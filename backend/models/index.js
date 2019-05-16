const sequelize = require('./sequelize');
const states = require('../constants/states');

const models = {};

[
    require('./State'),
    require('./User'),
    require('./HistoryEntry'),
    require('./Coefficietns'),
    require('./Choice'),
    require('./Subjects'),
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

sequelize.sync().then(async () => {
    const {State} = models;

    let presentStates = await State.findAll({});

    if (presentStates) {
        presentStates.forEach(async state => {
            let index = states.indexOf(state.name);
            if (index !== -1) {
                state.index = index;
                await state.save();
            } else {
                await state.destroy();
            }
        });
    }

    let newStates = states
        .filter(state => !presentStates.some(presenState => presenState.name === state))
        .map(name => ({name, index: states.indexOf(name)}));

    await State.bulkCreate(newStates);
})
.catch(e => console.error(e));

module.exports = models;
