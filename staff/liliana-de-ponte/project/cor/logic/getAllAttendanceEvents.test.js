import 'dotenv/config'
import getAllAttendanceEvents from './getAllAttendanceEvents.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllAttendanceEvents('66cc80613bc6b894d4cd0583'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())