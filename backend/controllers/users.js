let JWT = require('jsonwebtoken');
let User = require('../models/user');
let Todo = require('../models/todo');
let { JWT_SECRET } = require('../configurations');

signtoken = user => {
    return JWT.sign({
        iss: 'todoUser',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

module.exports = {
    signup: async (req, res, next) => {
        let { login, password } = req.body;
        // let login = req.body.login;
        // let password = req.body.password;
        // Create a new user 
        let newUser = new User({
            login: login,
            password: password
        });
        await newUser.save();

        // Generate token
        let token = signtoken(newUser);


        // Response with a token

        res.status(200).json({ token });
    },

    signin: async (req, res, next) => {
        // Generate login
        let token = signtoken(req.user);
        res.status(200).json({ token });
    },

    secret: async (req, res) => {
        let login = req.user.login;
        console.log('req.body is RIGHT HERE', req.user);
        let todos = await Todo.find({ login: login });
        console.log(todos);
        res.json({ secret: todos });
    }
} 
