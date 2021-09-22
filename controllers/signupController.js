const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../models/db.js');
const Account = require(`../models/Account`)

const signupController = {

    getSignUp: function (req, res) {
        var details = {};
        res.render(`signup`);
    },

    postSignUp: function (req, res) {
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

            if (req.session.username) {
                details.flag = true;
                details.name = req.session.name;
                details.username = req.session.username;
            }

            else
                details.flag = false;

            for (i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            res.render('signup', details);
        }

        else {
            var fName = req.body.fName;
            var lName = req.body.lName;
            var username = req.body.username;
            var pw = req.body.pw;

            bcrypt.hash(pw, saltRounds, function (err, hash) {

                var user = {
                    fName: fName,
                    lName: lName,
                    username: username,
                    pw: hash
                }

                db.insertOne(User, user, function (flag) {
                    if (flag) {
                        res.redirect('/success?fName=' + fName + '&lName=' + lName + '&username=' + username);
                    }
                });
            });
        }
    },

    getCheckUsername: async function (req, res) {
        var username = req.query.username;

        var result = await Account.findOne({ username }).exec()
        res.send(result);
	console.log(`Query result:${result}`)
    }

}

module.exports = signupController;