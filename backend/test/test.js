process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let assert = chai.assert;
chai.use(chaiHttp);

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
// let Todo = require('../app').Todo;
// let app = require('../app').app;
let { app, Todo } = require('../app.js');

describe('App test', function () {

    this.afterAll(function () {
        mongoose.connection.close();
    });

    it('Creates item', function (done) {
        Todo.deleteMany({ name: 'smth' }, function (err, result) {
            if (err) {
                res.send(err);
            }
        });

        chai.request(app).post("/todos/create")
            .set('content-type', 'application/json')
            .send({ name: "smth", done: false })
            .then(function (res) {
                console.log(res.body);

                let expected = "Item created";
                assert.equal(res.body, expected);
                done();
            });
    });
});
