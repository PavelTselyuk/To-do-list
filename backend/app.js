let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let static = require('serve-static');
let path = require('path');


//======= mongoose connection =======//
// if (process.env.NODE_ENV == 'test') {
//     mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
// } else {
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true });
// }

// app.engine('ejs', require('ejs-locals'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.use(static(path.join(__dirname, 'public')));


let todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});
let Todo = mongoose.model("Todo", todoSchema);

// let todolist = [
//     "doing1-st thing",
//     "then another",
//     "and one more"
// ]


//========== express routers ======//
app.get('/todos', function (req, res) {
    Todo.find({})
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/todos/create', function (req, res) {
    let newItem = new Todo({
        name: req.body.name
    });

    newItem.save()
        .then((item) => res.json("Item created"))
        .catch(err => res.status(400).json('Error: ' + err));

});

app.post('/todos/:id/complete', function (req, res) {
    console.log(req.params);
    let todoId = req.params.id;

    Todo.findById(todoId)
        .then(function (result) {
            result.done = !result.done;
            result.save();
            res.json('(Un)comleted');
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

app.delete('/todos/:id/delete', function (req, res) {
    console.log(req.params);
    let todoId = req.params.id;

    Todo.findByIdAndDelete(todoId)
        .then(() => res.json('item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


app.get('*', function (req, res) {
    res.send("<h1> Invalid address</h1>");
});


app.listen(5000, function () {
    console.log("server's listening on port 5000");
});

module.exports = { app, Todo };