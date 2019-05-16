const express = require('express');

const router = express.Router();
const {Subjects, Coefficients} = require('../models');
const authMiddleware = require('../middleware').auth;
const sequelize = require('../models/sequelize');

/*
 /api/subjects/
 */

router.use(authMiddleware);

router.post('/', async function (req, res) {
    try {
        const {subjects} = req.body;

        let subjectsArray = [];
        let firstProff = 1;
        let secondProff = 1;
        let thirdProff = 1;

        subjects.forEach(async subject => {
            let subj = await Subjects.findOne({
                where: {user_id:req.decodedToken.userId}
            });
            if (!subj) {
                subj = await Subjects.create({
                    key: subject.key,
                    hours: subject.hours,
                    is_need: subject.is_need,
                    name: subject.name,
                    user_id: req.decodedToken.userId
                });
            }
            subjectsArray.push(subj);

            switch (subj.key) {
                case 'graph':
                    if (subject.hours > 120) {
                        firstProff = 1.5;
                    } else if (subject.hours < 120) {
                        firstProff = 0.75;
                    }
                    break;
                case 'net':
                    if (subject.hours > 225) {
                        secondProff = 1.5;
                    } else if (subject.hours < 225) {
                        secondProff = 0.75;
                    }
                    break;
                case 'prog':
                    if (subject.hours > 258) {
                        thirdProff = 1.5;
                    } else if (subject.hours < 258) {
                        thirdProff = 0.75;
                    }
                    break;
                default:
                    break;
            }
        });

        let coeff = await Coefficients.findOne({
            where: {user_id:req.decodedToken.userId}
        });
        if (!coeff) {
            await Coefficients.create({
                user_id: req.decodedToken.userId,
                first_proff: firstProff,
                second_proff: secondProff,
                third_proff: thirdProff
            });
        } else {
            coeff.first_proff = firstProff;
            coeff.second_proff = secondProff;
            coeff.third_proff = thirdProff;
            coeff.save();
        }

        res.status(200).send({
            subjects: subjectsArray,
            coefficients: coeff
        });
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

router.get('/', async function (req, res) {
    try {
        let subjects = await Subjects.findAll({
            where: {
                user_id: req.decodedToken.userId,
            }
        });

        let coefficients = await Coefficients.findOne({
            where: {
                user_id: req.decodedToken.userId,
            }
        });

        res.status(200).send({
            subjects,
            coefficients
        });
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

module.exports = router;
