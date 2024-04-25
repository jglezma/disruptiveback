import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb://localhost:27017/disruptive'
    )
  } catch (error) {
    console.log(error)
  }
}
