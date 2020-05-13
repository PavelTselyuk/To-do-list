let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let static = require('serve-static');
let path = require('path');


//======= mongoose connection =======//
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true });

// app.engine('ejs', require('ejs-locals'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(static(path.join(__dirname, 'public')));


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
app.get('/', function (req, res) {
    Todo.find({}, function (err, todolist) {
        if (err) console.log(err);
        else {
            res.render("index.ejs", { todolist: todolist });
        }
    })
});

app.post('/newtodo', function (req, res) {
    console.log('item submitted');
    let newItem = new Todo({
        name: req.body.item
    });
    newItem.save().then(function (results) {
        res.redirect("/");
    }).catch(function (err) {
        console.log(err);
        res.redirect("/");
    })
});

app.post('/newtodo/:id/comleted', function (req, res) {
    console.log(req.params);
    let todoId = req.params.id;

    Todo.findById(todoId)
        .exec()
        .then(function (result) {
            result.done = !result.done;
            return result.save();
        }).then(function (result) {
            res.redirect("/");
        })
});

app.post('/newtodo/:id/delete', function (req, res) {
    console.log(req.params);
    let todoId = req.params.id;

    Todo.findByIdAndDelete(todoId, function (err, result) {
        if (err) throw (err);
        else {
            res.redirect('/');
        }
    });
});


app.get('*', function (req, res) {
    res.send("<h1> Invalid address</h1>");
});


app.listen(3000, function () {
    console.log("server's listening on port 3000");
});