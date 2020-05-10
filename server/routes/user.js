const user = require('../models/user');

/*
 * GET users listing.
 */
exports.list = function (req, res) {
//    auth(req);
    console.log('Listing users');
    user.list((err, result) =>
        respond(err, result, res)
    );
};

/*
 * POST new create user request.
 */
exports.create = function (req, res) {
    console.log('Creating new user');
    user.create(req.body, (err, result) =>
        respond(err, result, res)
    );
};

