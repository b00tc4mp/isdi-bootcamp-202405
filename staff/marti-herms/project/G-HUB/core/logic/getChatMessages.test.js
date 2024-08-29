import 'dotenv/config'
import mongoose from 'mongoose'

import getChatMessages from './getChatMessages.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getChatMessages('66acb2b1730b0f09da259589', '66acb2b1730b0f09da259589'))
    .then(messages => console.log(messages))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())