const User = require('../models/userModel');
const path = require('path');
const { generatePDF } = require('../services/pdfService');
exports.createUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      conformpassword,
      phoneNumber,
      dateOfBirth,
      gender,
      addressLine1,
      addressLine2,
      country,
      state,
      city,
      zipCode,
      occupation,
      annualIncome,
      signature
    } = req.body;

    if (!signature) {
      return res.status(400).json({ message: 'Signature path is required.' });
    }

    const user = new User({
      fullName,
      email,
      password,
      conformpassword,
      phoneNumber,
      dateOfBirth,
      gender,
      addressLine1,
      addressLine2,
      country,
      state,
      city,
      zipCode,
      occupation,
      annualIncome,
      signature,
    });
    user.pdfPath = await generatePDF(user);

    await user.save();
    res.status(201).json({
      success: true,
      message: 'User created successfully.',
      data: user
    });
  } catch (err) {
    console.error("User creation error:", err);
    res.status(400).json({ message: err.message });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
