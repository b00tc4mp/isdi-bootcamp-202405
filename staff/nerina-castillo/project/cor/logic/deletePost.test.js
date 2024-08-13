import 'dotenv/config'
import mongoose, { mongo } from 'mongoose'
import deletePost from './deletePost.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('66bb01ec11ee5fa8de368abd', '66bb021e1aa2e3bd435bd1a3'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())