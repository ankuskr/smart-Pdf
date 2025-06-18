const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, minlength: 2, maxlength: 50 },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  predictedAge: Number,
  addressLine1: { type: String, required: true },
  addressLine2: String,
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  occupation: { type: String, required: true },
  annualIncome: Number,
  signature: { type: String },
  pdfPath: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
