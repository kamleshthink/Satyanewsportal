import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// यूजर रजिस्ट्रेशन
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // चेक करें कि यूजर पहले से मौजूद तो नहीं है
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'यूजर पहले से मौजूद है' });
    }

    // नया यूजर बनाएं
    const user = await User.create({
      name,
      email,
      password
    });

    // JWT टोकन जनरेट करें
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// यूजर लॉगिन
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // यूजर को ढूंढें
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'अमान्य ईमेल या पासवर्ड' });
    }

    // पासवर्ड चेक करें
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'अमान्य ईमेल या पासवर्ड' });
    }

    // JWT टोकन जनरेट करें
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 