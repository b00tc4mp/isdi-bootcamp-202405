import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePostCaption('abtg', '66a94d82e31ef34d4feabf1a', 'weeeee',))
    .then(() => console.log('post caption update'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())