const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();


// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "pdf_uploads", // Folder in cloudinary
    resource_type: "raw",  // important for PDFs (not images)
    format: async (req, file) => "pdf", // Force PDF format
    public_id: (req, file) => Date.now(), // Unique name
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
