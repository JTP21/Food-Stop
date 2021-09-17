const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    username: String,
    password: String
});

const Post = mongoose.model('Account', PostSchema);

module.exports = Post;