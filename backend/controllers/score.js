const { User, HistoryEntry, State } = require('../models');
const config = require('../config');

module.exports = {
/*token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOjEsImlhdCI6MTUyNTk0NTk3MiwiZXhwIjoxNTI2MTE4NzcyfQ.
c6yQJ9narbKmcoH1wmwbHmktZE0QX4JPn6-ctaZJNQE*/
    getAllScores: async function (req, res) {
        try {
            let scores = await HistoryEntry.findAll({
                include: [{model: State, required: true}],
                where: {
                    user_id: req.decodedToken.userId,
                },
            });
            res.status(200).send(
                scores.map(entry => ({
                    state: entry.state.name,
                    time: entry.time,
                    score: entry.score,
                }))
            );
        } catch (e) {
            console.error(e);
            res.status(500).send();
        }
    }
}