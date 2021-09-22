const successController = {

    getSuccess: function (req, res) {
        var details = {
            fName: req.query.fName,
            lName: req.query.lName,
            username: req.query.username
        };

        if (req.session.username) {
            details.flag = true;
            details.name = req.session.name;
            details.username = req.session.username;
        }

        else
            details.flag = false;

        res.render('success', details);
    }

}

module.exports = successController;