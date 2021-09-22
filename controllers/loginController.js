const bcrypt = require('bcrypt');

const db = require('../models/db.js');
const Account = require(`../models/Account`);

const loginController = {
    
    getLogIn: function (req, res) {

        res.render(`login`);
    },

    postLogIn: async function (req, res) {
        var username = req.body.username;
        var pw = req.body.password;

        var result = await Account.findOne({ username, password: pw }).exec()
        if (result) {
            console.log(`Login Result: ${result}`)
            var account = {
                fname: result.fname,
                lname: result.lname,
                username: result.username,
                password: result.password
            }

            var details = {
                flag: true,
                username: result.username
            }

            req.session.username = account.username

            res.redirect('/');
        }

        else {
            var details = {
                flag: false,
                error: `ID Number and/or Password is incorrect.`
            };

            res.render('login', details);
        }


    }
}

module.exports = loginController;