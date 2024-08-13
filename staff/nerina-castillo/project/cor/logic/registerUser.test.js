import 'dotenv/config'
import registerUser from './registerUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('julito', 'julitocamelas', 'user', 'julito@camelas.com', 'julito123', 'julito123'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())