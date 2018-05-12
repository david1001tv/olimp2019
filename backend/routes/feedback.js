const express = require('express');

const router = express.Router();
const RateLimit = require('express-rate-limit');
const sendmail = require('sendmail')();
const validate = require('validate.js');
const config = require('../config');

const limiter = new RateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 часа
    max: 3, // за время windowMs клиент может послать 3 запроса
    delayMs: 0, // запросы обрабатываются без задержки
    message: JSON.stringify({
        error: 'Ліміт повідомлень для вашої IP-адреси вичерпано, спробуйте пізніше'
    })
});
/*
 /api/feedback/
 */

router.use(limiter);


const validationConstraints = {
    email: {
        presence: {
            allowEmpty: false,
            message: 'e-mail відсутній'
        },
        email: {
            message: 'e-mail не відповідає формату'
        }
    },
    text: {
        presence: {
            allowEmpty: false,
            message: 'Текст відсутній'
        }
    }
};

function feedbackValidator(req, res, next) {
    const {body} = req;
    // валидация данных

    let errors = validate(body, validationConstraints);

    if (errors !== undefined) {
        console.log('Validation errors', errors);
        res.status(400).json({errors});
    } else {
        next();
    }
}

router.post('/', feedbackValidator, async function (req, res) {
    sendmail({
        from: `feedback@${config.mail.domain}`,
        to: config.mail.receiver,
        subject: 'Зворотній зв\'язок',
        text: `${req.body.email} пише: ${req.body.text}`,
    }, function(err, reply) {
        if (err) {
            console.error(err);
            res.status(500).send();
        } else {
            res.status(200).send();
        }
    });
});

module.exports = router;
