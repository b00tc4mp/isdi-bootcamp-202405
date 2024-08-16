import 'dotenv/config'
import registerUser from './registerUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('barrenfienlds', 'barrenfieldsband', 'band', 'barren@fields.com', 'barrenfields1', 'barrenfields1'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())