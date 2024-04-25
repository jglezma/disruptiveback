import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  contentTypes: {
    type: String,
    enum: ['images', 'videos', 'documents'],
    required: true,
  },
  permissions: {
    read: {
      type: Boolean,
      default: false,
    },
    create: {
      type: Boolean,
      default: false,
    },
    update: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
  },
  themes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theme',
  }],
}, {
  timestamps: true,
  versionKey: false,
});


export default mongoose.model('Category', categorySchema);
