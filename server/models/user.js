const mongoose = require('mongoose');
const { Schema } = mongoose; 
const bcrypt = require('bcryptjs'); // For password hashing

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
  }],
}, {
  timestamps: true 
});

// Password hashing before saving a user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password has been modified

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); 
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
