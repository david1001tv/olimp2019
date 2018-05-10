const express = require('express');

const router = express.Router();
const app = require('./../main.js');
const config = require('./../config');
const {
    getAllScores,
} = require('../controllers/score');
const authMiddelware = require('../middleware').auth;

/*
 /api/score/
 */

router.get('/all', authMiddelware, getAllScores);

module.exports = router;