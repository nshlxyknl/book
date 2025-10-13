const Task = require("../models/Book");
const cloudinary = require("cloudinary").v2;

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
    const { title, price } = req.body;
    const sellerId = req.user?.userId;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and price are required" });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const publicId = req.file.filename;

    const preview = cloudinary.url(publicId, {
      resource_type: "image",
      page: 1,
      crop: "fill",
      width: 300,
      height: 400,
      format: "jpg"
    });

    // Create and save new task, assignedBy comes from authenticated user
    const task = await Task.create({
      title,
      price,
      pdfUrl: req.file.path,
      previewUrl: preview,
      seller: sellerId
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
    const tasks = await Task.find({ seller: req.user.userId })
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
        _id: req.params.id,
        seller: req.user.userId,
      },
      { status: req.body.status },
      { new: true }
    ).populate("seller", "username");

    if (!task) {
      return res.status(404).json({
        message: "sold out",
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
    const book = await Task.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Task not found",
      });
    }


    if (
      req.user.role === 'admin' ||
      book.seller.toString() === req.user.userId
    ) {
      await Task.findByIdAndDelete(req.params.id)

      res.json({
        message: "Task deleted successfully",
      });
    }

    else {
      return res.status(403).json({
        message: "Not authorized to delete this book",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Could not delete task",
      details: error.message,
    });
  }
};

