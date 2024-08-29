import 'dotenv/config'
import mongoose from 'mongoose'

import editUserUsername from './editUserUsername.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => editUserUsername('66acb2b1730b0f09da259589', 'eden'))
    .then(games => console.log(games))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())