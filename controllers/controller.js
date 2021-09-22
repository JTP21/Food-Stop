const Post = require(`../models/Post`)
const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: async function (req, res) {
        var details = {
            flag: false
        }
        if (req.session.username) {
            details.flag = true
            details.username = req.session.username
        }

        var savedPosts = await Post.find()

        details.post = savedPosts

        res.render('index', details);
    }
}

module.exports = controller;