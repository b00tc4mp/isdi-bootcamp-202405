import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePostCaption('66accdd2e9ee54b250431485', '66acce028f9a08e3fb4e26a7', 'manu, mi super heroe!'))
    .then(() => console.log('post caption updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

