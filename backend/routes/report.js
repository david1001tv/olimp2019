const express = require('express');
const xlsx = require('node-xlsx')
const router = express.Router();

const {HistoryEntry, State, User} = require('../models');
const sequelize = require('../models/sequelize');

const authMiddleware = require('../middleware').auth;



/*
 /api/report/
 */

// router.use(authMiddleware);

router.get('/json', async function (req, res) {
    try {
        let lastStateIndex = await State.max('index');

        let report = await HistoryEntry.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('time')), 'time'],
                [sequelize.fn('SUM', sequelize.col('score')), 'score'],
                [sequelize.fn('MAX', sequelize.col('index')), 'lastIndex'],
            ],
            having: {
                lastIndex: lastStateIndex
            },
            include: [
                {model: State, required: true},
                {model: User, required: true},
            ],
            order: [
                [sequelize.fn('SUM', sequelize.col('score')), 'DESC'],
            ],
            limit: 10,
            group: 'user.id',
        });

        res.status(200).json(report.map(e => ({
            name: e.user.lastName + ' ' + e.user.firstName,
            time: e.time,
            score: e.score,
        })).sort((a, b) => b - a));
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }
});

router.get('/excel', async function (req, res) {
    res.contentType('application/octet-stream');
    res.setHeader('Content-disposition', `attachment; filename="report.xlsx"`);

    let report = await HistoryEntry.findAll({
        include: [
            {model: State, required: true},
            {model: User, required: true},
        ],
    });

    const data = report.map(e => [
        e.user.firstName,
        e.user.lastName,
        e.state.name,
        e.time,
        e.score,
    ]);

    data.unshift(['Ім\'я', 'Прізвище', 'Етап', 'Час, мс', 'Бали']);

    let buffer = xlsx.build([{name: "Звіт", data}]);
    res.end(buffer, 'binary');
});

module.exports = router;
