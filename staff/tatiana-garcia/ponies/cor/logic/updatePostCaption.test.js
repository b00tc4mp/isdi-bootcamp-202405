import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePostCaption('66acf0f09c0d3d4816596cc5', '66acf11f737f18ee661a2ea9', 'weeeee',))
    .then(() => console.log('post caption update'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())