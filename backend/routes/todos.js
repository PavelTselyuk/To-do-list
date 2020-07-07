let router = require('express-promise-router')();
let passport = require('passport');
let passportJWT = passport.authenticate('jwt', {session: false});


let TodosController = require('../controllers/todos');

router.route('/add')
    .post(passportJWT, TodosController.add);

router.route('/complete/:id')
    .post(passportJWT, TodosController.complete);

router.route('/delete/:id')
    .delete(passportJWT, TodosController.delete);
 

module.exports = router;