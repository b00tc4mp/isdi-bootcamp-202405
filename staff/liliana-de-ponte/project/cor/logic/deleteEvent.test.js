import 'dotenv/config'
import deleteEvent from './deleteEvent.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deleteEvent('66bc82a39febf119fc285dfa', '66bc82d5bbbeb7957c86f029'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())