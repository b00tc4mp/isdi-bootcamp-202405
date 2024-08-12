import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('66acc905a4613054b12160b5', '66acca61e91582efe0694c8f'))
    .then(() => console.log('Post deleted'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())