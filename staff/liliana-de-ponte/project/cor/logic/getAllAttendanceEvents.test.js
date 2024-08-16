import 'dotenv/config'
import getAllAttendanceEvents from './getAllAttendanceEvents.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllAttendanceEvents('66bf6e5cc835c025c336f867'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())