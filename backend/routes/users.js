let express = require('express');
let router = require('express-promise-router')();
let passport = require('passport');
let passportConf = require('../passport');
let passportSignIn = passport.authenticate('local', {session: false});
let passportJWT = passport.authenticate('jwt', {session: false});


let UsersController = require('../controllers/users');

router.route('/signup')
    .post(UsersController.signup);

router.route('/signin')
    .post(passportSignIn, UsersController.signin);

router.route('/secret')
    .get(passportJWT, UsersController.secret);
 

module.exports = router;