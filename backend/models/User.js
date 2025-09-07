const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// This is the blueprint for how user data is stored in MongoDB
// It defines what information we keep about each user
const userSchema = new mongoose.Schema(
  {
    // Username field - must be unique so no two users can have the same username
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // Password field - will be encrypted before saving
    password: {
      type: String,
      required: true,
    },
    // Role field - can only be 'admin' or 'user'
    // If no role is specified when creating a user, they'll be a regular 'user'
    role: {
      type: String,
      enum: ["admin", "buyer","seller"],
      required: true,
      // default: "buyer",
    },
  },
  // This option automatically adds createdAt and updatedAt timestamps
  { timestamps: true }
);

// This code runs before saving a user to the database
// It encrypts the password so we never store plain text passwords
userSchema.pre("save", async function (next) {
  // Only encrypt the password if it has been modified
  // This prevents double-encryption when updating other user details
  if (!this.isModified("password")) return next();

  // Generate a secure password hash using bcrypt
  // The number 10 is the "salt rounds" - higher means more secure but slower
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// This method lets us safely check if a password is correct
// It compares the plain text password with the encrypted one in the database
userSchema.methods.comparePassword = async function (password) {
  // Returns true if passwords match, false if they don't
  return await bcrypt.compare(password, this.password);
};

// Create the User model from our schema
module.exports = mongoose.model("User", userSchema);
