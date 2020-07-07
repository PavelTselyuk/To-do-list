let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let static = require('serve-static');
let path = require('path');
let morgan = require('morgan');
let cors = require('cors');


//======= mongoose connection =======//
// if (process.env.NODE_ENV == 'test') {
//     mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
// } else {
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true });
// }

let app = express();
app.use(cors());



// app.engine('ejs', require('ejs-locals'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.use(static(path.join(__dirname, 'public')));



//========== express routers ======//
app.use('/users', require('./routes/users'));

app.use('/users/secret', require('./routes/todos'));

// app.get('/todos', function (req, res) {
//     Todo.find({})
//         .then(items => res.json(items))
//         .catch(err => res.status(400).json('Error: ' + err));
// });


app.get('*', function (req, res) {
    res.send("<h1> Invalid address</h1>");
});


app.listen(5000, function () {
    console.log("server's listening on port 5000");
});

module.exports = { app };