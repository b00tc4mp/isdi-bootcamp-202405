import 'dotenv/config'
import getAllPoniesPosts from './getAllPoniesPosts.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllPoniesPosts('66acf00d9fd8201a1c692c85'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())