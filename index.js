const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/FoodStopDB')

const express = require('express');

const session = require(`express-session`);

const MongoStore = require(`connect-mongo`);

const app = express();
const hbs = require('hbs');

const routes = require('./routes/routes.js');

const db = require('./models/db');
const Post = require("./models/Post")
const Account = require("./models/Account")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const fileUpload = require('express-fileupload')
const path = require('path')
app.use(fileUpload())

app.use(
    session({
        secret: 'ccapdev-session',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost/FoodStopDB' })
    })
);

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'))
app.use(express.static('assets'))

app.get('/views/signup', function (req, res) {
    res.sendFile(path.join(__dirname + './views/signup.html'));
});

app.use('/', routes);

app.post('/submit-post', function (req, res) {
    const { image } = req.files
    image.mv(path.resolve(__dirname, 'public/images', image.name), (error) => {
        Post.create(
            {
                ...req.body,
                image: '/images/' + image.name
            }, (error, post) => {
                console.log(req.body)
                res.redirect('/')
            })
    })
});

app.post('/submit-account', async function (req, res) {
    console.log(req.body)

    var result = Account.findOne({ username: req.body.username }).exec()
    Account.create(req.body, (error, post) => {
        console.log(req.body)
        res.redirect('/login')
    })
});

app.get('/index', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', { posts })
})

app.get(`/post/:title`, async (req, res) => {
    const post = await Post.findOne({ title: req.params.title }).exec()
    console.log(`Post Title: ${post.title}`)
    console.log(`Post Description: ${post.description}`)
    console.log(`Post Body: ${post.body}`)
    console.log(`Post Image: ${post.image}`)
    if (post.title != null) {
        var details = {
            title: post.title,
            description: post.description,
	    body: post.body,
            image: post.image,
            flag: true,
            username: req.session.username
        }

        res.render(`post`, details);
    }
    else {

    }

})

var server = app.listen(3000, function () {
    console.log('Localhost 3000 is running..');
});

