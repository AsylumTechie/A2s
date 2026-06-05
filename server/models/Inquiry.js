import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    serviceCategory: { type: String, required: true },
    serviceName: { type: String },
    planType: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'closed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Inquiry', inquirySchema);
