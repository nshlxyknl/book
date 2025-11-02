const Sale = require("../models/Sales");

exports.pending  = async (req, res) => { 
    try {
       
         res.status(201).json({
      task,
      message: "Task created successfully",
    });
    } catch (error) {
       res.status(500).json({
      message: "Could not make pending",
      details: error.message,
    });
    }
}


exports.updateSalesStatus = async (req, res) => { 
    try {

        res.status(201).json({
      task,
      message: "Task created successfully",
    });
    } catch (error) {
        res.status(500).json({
      message: "Could not update",
      details: error.message,
    });
    }
}