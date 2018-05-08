const express = require('express');

const router = express.Router();
const {HistoryEntry, State} = require('../models');
const authMiddleware = require('../middleware').auth;
const sequelize = require('../models/sequelize');

/*
 /api/history/
 */

router.use(authMiddleware);

router.post('/state/:state', async function (req, res) {
    try {
        const state = (await State.findOne({
            where: {name: req.params.state}
        }));

        if (!state) {
            res.status(400).send();
            return;
        }

        let lastIndex = (await sequelize.query(`SELECT 
    MAX(idx) AS lastStateIndex
FROM
    (SELECT 
        history_entry.user_id AS user_id, state.index AS idx
    FROM
        history_entry
    INNER JOIN state ON history_entry.state_id = state.id
    WHERE
        user_id = ?) AS aaaa`, {
            replacements: [req.decodedToken.userId]
        }))[0][0].lastStateIndex;

        lastIndex = lastIndex !== undefined ? lastIndex : -1;

        if (state.index > lastIndex + 1) {
            res.status(400).send('States are not sequential');
            return;
        }

        const historyEntry = (await HistoryEntry.findOne({
            where: {
                state_id: state.id,
                user_id: req.decodedToken.userId
            }
        }));

        if (historyEntry) {
            historyEntry.time = req.body.time;
            historyEntry.score = req.body.score;
            await historyEntry.save();
        } else {
            await HistoryEntry.create({
                time: req.body.time,
                score: req.body.score,
                state_id: state.id,
                user_id: req.decodedToken.userId,
            });
        }

        res.status(200).send();
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.get('/all', async function (req, res) {
    try {
        let history = await HistoryEntry.findAll({
            include: [{model: State, required: true}],
            where: {
                user_id: req.decodedToken.userId,
            },
            order: [
                [State, 'index', 'ASC']
            ]
        });

        res.status(200).send(history.map(entry => ({
            state: entry.state.name,
            time: entry.time,
            score: entry.score,
        })));
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.get('/state/:state', async function (req, res) {
    try {
        let entry = await HistoryEntry.find({
            include: [{
                model: State,
                required: true,
                where: {
                    name: req.params.state
                },
            }]
        });

        res.status(200).json({
            state: entry.state.name,
            time: entry.time,
            score: entry.score,
        });
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
