const express = require('express');

const router = express.Router();
const {User} = require('../models');
const authMiddleware = require('../middleware').auth;
const sequelize = require('../models/sequelize');

/*
 /api/me/
 */

router.use(authMiddleware);

router.get('/', async function (req, res) {
    try {
        let user = await User.findOne({
            where: {id:req.decodedToken.userId}
        });

        res.status(200).send(user);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

module.exports = router;
