import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  alias: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'creator', 'reader'],
    required: true,
  },
  contentPermissions: {
    images: {
      type: Boolean,
      default: false,
    },
    videos: {
      type: Boolean,
      default: false,
    },
    documents: {
      type: Boolean,
      default: false,
    },
  },
}, {
  timestamps: true,
  versionKey: false,
});

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
