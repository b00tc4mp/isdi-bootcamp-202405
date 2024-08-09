import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePostCaption('66acd7e6f28f138bd0f0752d', '66ace09051e8d761f308aeaf', 'New Caption para mi post'))
    .then(() => console.log('new caption'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
