import app from './app.js'
import { connectDB } from './utils/mongoose.js'

const main = async () => {
  await connectDB()
  app.listen(4000)
  console.log(':D Server is running on port: ', 4000)
}

main()
