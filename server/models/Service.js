import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: [
        'website-development',
        'digital-marketing',
        'graphic-branding',
        'ecommerce-setup',
        'business-growth',
        'seller-central',
      ],
    },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Globe' },
    features: [{ type: String }],
    featureSections: [
      {
        title: { type: String },
        items: [{ type: String }],
      },
    ],
    order: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
