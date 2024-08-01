import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePostCaption('samu', '66ab5ff1f91a0b35f51a16eb', 'manu, mi super heroe!'))
    .then(() => console.log('post caption updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

