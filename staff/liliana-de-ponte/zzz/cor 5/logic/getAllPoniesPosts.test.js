import 'dotenv/config'
import getAllPoniesPosts from "./getAllPoniesPosts.js"

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllPoniesPosts("lilideponte"))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
