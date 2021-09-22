const express = require('express');
const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const successController = require('../controllers/successController.js');
const loginController = require('../controllers/loginController.js');
const profileController = require('../controllers/profileController.js');
const logoutController = require('../controllers/logoutController.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);
app.get('/', controller.getIndex);
app.get('/signup', signupController.getSignUp);
app.post('/signup', signupController.postSignUp);
app.get('/getCheckUsername', signupController.getCheckUsername);
app.get('/success', successController.getSuccess);
app.get('/login', loginController.getLogIn);

app.get('/register', signupController.getSignUp);
app.post('/login', loginController.postLogIn);
app.get('/profile/:username', profileController.getProfile);
app.get('/logout', logoutController.getLogOut);

module.exports = app;