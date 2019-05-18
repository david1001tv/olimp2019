const express = require('express');

const router = express.Router();
const {Choice} = require('../models');
const authMiddleware = require('../middleware').auth;
const sequelize = require('../models/sequelize');

/*
 /api/subjects/
 */

router.use(authMiddleware);

router.post('/', async function (req, res) {
    try {
        const {friend = null, magistracy = null, science = null, profession = ''} = req.body;

        let choice = await Choice.findOne({
            where: {user_id:req.decodedToken.userId}
        });
        if (!choice) {
            choice = await Choice.create({
                user_id: req.decodedToken.userId,
                friend: friend,
                magistracy: magistracy,
                science: science,
                profession: profession
            });
        } else {
            choice.friend = friend !== null ? friend : choice.friend;
            choice.magistracy = magistracy !== null ? magistracy : choice.magistracy;
            choice.science = science !== null ? science : choice.science;
            choice.profession = profession !== '' ? profession : choice.profession
            choice.save();
        }

        res.status(200).send(choice);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.get('/', async function (req, res) {
    try {
        let choice = await Choice.findOne({
            where: {
                user_id: req.decodedToken.userId,
            }
        });

        res.status(200).send(choice);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

module.exports = router;
