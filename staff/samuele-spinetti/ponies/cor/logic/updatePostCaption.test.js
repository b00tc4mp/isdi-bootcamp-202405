import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePostCaption('66acc905a4613054b12160b5', '66acca9105d8720b486dbef4', 'Hello, soy Marco:)'))
    .then(() => console.log('Post caption updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())