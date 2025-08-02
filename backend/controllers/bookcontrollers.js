const Task = require("../models/Book");

/**
 * Task Controller: Handles all task-related operations in the backend
 * This file contains the business logic for managing tasks
 */

/** 
 * Creates a new task in the system
 * Only admins can use this function (protected by middleware)
 * @param {Object} req - Express request object containing task details in body
 * @param {Object} res - Express response object
 */
exports.uploadpdf = async (req, res) => {
  try {
    // Extract task details from request body
    const { title, description, price, pdfUrl, seller } = req.body;
    const sellerId =req.user.userId;

    // Create and save new task, assignedBy comes from authenticated user
    const task = await Task.create({
      title,
      description,  
      price,
      pdfUrl,
      seller : sellerId
    });

    // Populate user details for the response
    await task.populate("seller", "username"); // if 'seller' is a ref to User


    res.status(201).json({
      task,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not create task",
      details: error.message,
    });
  }
};

/**
 * Retrieves all tasks in the system
 * Only admins can use this function (protected by middleware)
 */
exports.getallpdf = async (req, res) => {
  try { 
    // Find all tasks and include user details for assignedTo and assignedBy
    const tasks = await Task.find()
      .populate("seller", "username")
      .sort({ createdAt: -1 }); // Show newest tasks first

    res.json({
      tasks,
      count: tasks.length,
      message: "Tasks retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch tasks",
      details: error.message,
    });
  }
};

/**
 * Gets tasks assigned to the logged-in user
 * Any authenticated user can access their own tasks
 */
exports.getuserpdf = async (req, res) => {
  try {
    // Find tasks where assignedTo matches the logged-in user's ID
    const tasks = await Task.find({ assignedTo: req.user.userId })
      .populate("seller", "username")
      .sort({ createdAt: -1 });

    res.json({
      tasks,
      count: tasks.length,
      message: "Your tasks retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch your tasks",
      details: error.message,
    }); 
  }
};

/**
 * Updates the status of a task
 * Regular users can only update tasks assigned to them
 * Admins cannot update task status (by design)
 */
exports.updateTaskStatus = async (req, res) => {
  try {
    // Security check: only update if task is assigned to the requesting user
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.taskId,
        assignedTo: req.user.userId,
      },
      { status: req.body.status },
      { new: true }
    ).populate("assignedTo assignedBy", "username");

    if (!task) {
      return res.status(404).json({
        message: "Task not found or not assigned to you",
      });
    }

    res.json({
      task,
      message: `Task marked as ${req.body.status}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update task status",
      details: error.message,
    });
  }
};

/**
 * Deletes a task from the system
 * Only admins can delete tasks
 */
exports.delpdf = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete task",
      details: error.message,
    });
  }
};
