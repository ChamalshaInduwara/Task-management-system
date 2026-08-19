const Task = require("../models/Task");

// GET all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

// GET single task
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch task",
      error: error.message,
    });
  }
};

// CREATE task
const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        message: "Title, description and due date are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create task",
      error: error.message,
    });
  }
};

// UPDATE task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update task",
      error: error.message,
    });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};