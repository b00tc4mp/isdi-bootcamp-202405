import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePostCaption('samu', '66a1fce9899f38e1749e83e5', 'Hello, Marco:)'))
    .then(() => console.log('Post caption updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())