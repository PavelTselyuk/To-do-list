let Todo = require('../models/todo');

module.exports = {
   add: async (req, res, next) => {

      let newItem = new Todo({
         name: req.body.name,
         login: req.body.login
      });

      await newItem.save();
      res.status(200).json("Todo created");
   },

   complete: async (req, res, next) => {
      console.log(req.params);
      let todoId = req.params.id;

      let result = await Todo.findById(todoId);

      result.done = !result.done;
      await result.save();
      res.json('Todo (Un)comleted');

   },

   delete: async (req, res, next) => {
      console.log(req.params);
      let todoId = req.params.id;

      await Todo.findByIdAndDelete(todoId);
      res.json('item deleted.');
   }
} 