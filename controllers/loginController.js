// import module `bcrypt`
const bcrypt = require('bcrypt');

// import module `database` from `../models/db.js`
const db = require('../models/db.js');
const Account = require(`../models/Account`);

/*
    defines an object which contains functions executed as callback
    when a client requests for `login` paths in the server
*/
const loginController = {

    /*
        executed when the client sends an HTTP GET request `/login`
        as defined in `../routes/routes.js`
    */
    getLogIn: function (req, res) {

        res.render(`login`);
    },

    /*
        executed when the client sends an HTTP POST request `/login`
        as defined in `../routes/routes.js`
    */
    postLogIn: async function (req, res) {

        /*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="idNum">
            can be retrieved using `req.body.idNum`
        */
        var username = req.body.username;
        var pw = req.body.password;

        var result = await Account.findOne({username, password: pw}).exec()

        // console.log(`query result: ${result} | ${result.username}`)
        // if a user with `username` equal to `username` and `password` equal to `password` exists
        if (result) {
                console.log(`Result: ${result}`)
                var account = {
                    fName: result.fName,
                    lName: result.lName,
                    username: result.username,
                    password: result.password
                }

                var details = {
                    flag: true,
                    account
                }

                // insert session here

                
                res.redirect('/');
            }

            // else account does not exist
            else {

                /*
                    sets `details.flag` to false
                    to hide the profile and logout tabs in the nav bar
                */
                
                var details = {
                    flag: false,
                    error: `ID Number and/or Password is incorrect.`
                };

                /*
                    render `../views/login.hbs`
                    display the errors
                */
                res.render('login', details);
            }
        
    
    }
}

/*
    exports the object `loginController` (defined above)
    when another script exports from this file
*/
module.exports = loginController;