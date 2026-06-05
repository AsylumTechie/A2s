import express from 'express';
import { body, validationResult } from 'express-validator';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('serviceCategory').trim().notEmpty().withMessage('Service category is required'),
  ],
  validate,
  async (req, res) => {
    try {
      const inquiry = await Inquiry.create(req.body);
      res.status(201).json({ success: true, data: inquiry });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
