const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Todo = require("../module/todo.module");

// CREATE
router.post("/todo", async (req, res) => {
  try {
    const { title, description, userid } = req.body;
    if (!title || !description || !userid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTodo = new Todo({ title, description, userid });
    await newTodo.save();

    res.status(201).json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
});

// GET all todos
router.get("/alltodo", async (req, res) => {
  try {
    const todos = await Todo.find({}); 
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

// GET todos for specific user
router.get("/alltodo/:userid", async (req, res) => {
  try {
    const todos = await Todo.find({ userid: req.params.userid });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

// UPDATE
router.put("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const { title, description } = req.body;
    const todoItem = await Todo.findById(id);
    if (!todoItem) return res.status(404).json({ message: "Todo not found" });

    if (title) todoItem.title = title;
    if (description) todoItem.description = description;

    await todoItem.save();
    res.status(200).json({ message: "Todo updated", todo: todoItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
});

// DELETE
router.delete("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const todoItem = await Todo.findByIdAndDelete(id);
    if (!todoItem) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

module.exports = router;
