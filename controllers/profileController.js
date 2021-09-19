// import module `database` from `../models/db.js`
const db = require('../models/db.js');
const Account = require(`../models/Account`)

/*
    defines an object which contains functions executed as callback
    when a client requests for `profile` paths in the server
*/
const profileController = {

    /*
        executed when the client sends an HTTP GET request `/profile/:idNum`
        as defined in `../routes/routes.js`
    */
    getProfile: async function (req, res) {

        // query where `username` is equal to URL parameter `username`
        var query = { username: req.params.username };

        // fields to be returned
        var projection = 'fName lName username';

        var details = {};

        // checks if a user is logged-in by checking the session data
        if (req.session.username) {

            /*
                sets `details.flag` to true
                to display the profile and logout tabs in the nav bar
                sets the value of `details.name` to `req.session.name`
                to display the name of the logged-in user
                in the profile tab of the nav bar
                sets the value of `details.uidNum` to `req.session.idNum`
                to provide the link the profile of the logged-in user
                in the profile tab of the nav bar
                these values are rendered in `../views/partials/header.hbs`
            */
            details.flag = true;
            details.name = req.session.name;
            details.username = req.session.username;
        }

        // else if a user is not yet logged-in
        else
            /*
                sets `details.flag` to false
                to hide the profile and logout tabs in the nav bar
            */
            details.flag = false;

        /*
            calls the function findOne()
            defined in the `database` object in `../models/db.js`
            this function searches the collection `users`
            based on the value set in object `query`
            the third parameter is a string containing fields to be returned
            the fourth parameter is a callback function
            this called when the database returns a value
            saved in variable `result`
        */
        console.log(`Session username: ${req.session.username}`)
        var result = await Account.findOne({ username: req.session.username })

        /*
            if the user exists in the database
            render the profile page with their details
        */
        if (result != null) {
            details.fname = result.fname;
            details.lname = result.lname;
            details.username = result.username;

            console.log(`fName: ${result.fname}`)
            console.log(`lName: ${result.lname}`)
            console.log(`Found one: ${result.username}`)
            // render `../views/profile.hbs`
            res.render('profile', details);
        }
        /*
            if the user does not exist in the database
            render the error page
        */
        else {
            // render `../views/error.hbs`
            res.render('error', details);
        }
    }
}

/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = profileController;