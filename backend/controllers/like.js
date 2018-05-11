const { User } = require('../models');
const config = require('../config');

module.exports = {
    setLike: async function (req, res) {
        try {
            let user = await User.findById(req.decodedToken.userId);
            if (user.liked === null) {
                user.liked = true;
            }
            else {
                user.liked = !user.liked;
            }
            await user.save();
            res.status(200).json({
                success: true,
                userLiked: user.liked
            });
        } catch (e) {
            res.status(500).send();
        }
    },

    isSetLike: async function (req, res) {
        try {
            let user = await User.findById(req.decodedToken.userId);
            res.status(200).json({
                success: true,
                userLiked: user.liked
            });
        } catch (e) {
            res.status(500).send();
        }
    },

    getAllLikes: async function (req, res) {
        try {
            res.status(200).json({
                success: true,
                count: await User.count({ where: { liked: true } }),
            });
        } catch (e) {
            res.status(500).send();
        }
    }
}