let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let todoSchema = new Schema({
   name: {
       type: String,
       required: true
   },
   done: {
       type: Boolean,
       default: false
   },
   login: {
       type: String,
       required: true
   },
});


let Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo; 