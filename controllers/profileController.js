const db = require('../models/db.js');
const Account = require(`../models/Account`)

const profileController = {

    getProfile: async function (req, res) {

        var query = { username: req.params.username };
        var projection = 'fName lName username';

        var details = {};

        if (req.session.username) {
            details.flag = true;
            details.name = req.session.name;
            details.username = req.session.username;
        }

       
        else
 
            details.flag = false;

        console.log(`Session username: ${req.session.username}`)
        var result = await Account.findOne({ username: req.session.username })

        if (result != null) {
            details.fname = result.fname;
            details.lname = result.lname;
            details.username = result.username;

            console.log(`fName: ${result.fname}`)
            console.log(`lName: ${result.lname}`)
            console.log(`Found one: ${result.username}`)
            res.render('profile', details);
        }
       
        else {
            res.render('error', details);
        }
    }
}

module.exports = profileController;