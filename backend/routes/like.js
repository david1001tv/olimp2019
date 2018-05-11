const express = require('express');

const router = express.Router();
const app = require('./../main.js');
const config = require('./../config');
const {
    setLike,
    isSetLike,
    getAllLikes,
} = require('../controllers/like');
const authMiddelware = require('../middleware').auth;

/*
 /api/like/
 */
router.post('/', authMiddelware, setLike);

router.get('/', authMiddelware, isSetLike);

router.get('/all', getAllLikes);

module.exports = router;