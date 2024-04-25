import mongoose from 'mongoose';

const contentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    enum: ['image', 'video', 'document'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theme',
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  credits: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default mongoose.model('Content', contentSchema);
