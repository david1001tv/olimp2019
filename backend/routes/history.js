const express = require('express');

const router = express.Router();
const {HistoryEntry, State} = require('../models');
const authMiddleware = require('../middleware').auth;

/*
 /api/history/
 */

router.use(authMiddleware);

router.post('/:state', async function (req, res) {
    try {
        const state = (await State.findOne({
            where: {name: req.params.state}
        })).dataValues;

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
        res.status(500).send();
    }
});

router.get('/all', async function (req, res) {
    try {
        let history = await HistoryEntry.findAll({
            include: [{model: State, required: true}]
        });

        res.status(200).send(history.map(entry => ({
            state: entry.state.name,
            time: entry.time,
            score: entry.score,
        })));
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/:state', async function (req, res) {
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
