const mongoose = require('mongoose');
const Todos = require('../dbTodos');

// Get todos list
const getTodos = async (req, res) => {
  try {
    const allTodos = await Todos.find({}).sort({ createdAt: -1 });
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//create todo 
const createTodo = async(req, res) => {
  const dbTodo = req.body;
  try {
  const newTodo = await Todos.create(dbTodo);
  res.status(201).send(newTodo)
  } catch(error) {
   res.status(500).send(error.message);
   };
  };

// Update todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`There is no todo with the id of ${id}`);
    }

    const todoID = { _id: id };
    const update = { completed: true };
    // Corrected the method call to use the update object and options object
    const updatedTodo = await Todos.findOneAndUpdate(todoID, update, {
      new: true, // Return the updated todo after the update
    });

    if (!updatedTodo) {
      return res.status(404).send(`There is no todo with the id of ${id}`);
    }

    res.status(200).send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`There is no todo with the id of ${id}`);
    }
    const deleteTodo = await Todos.findOneAndDelete({ _id: id });
    res.status(200).send(deleteTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};