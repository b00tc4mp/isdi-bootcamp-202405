import 'dotenv/config'
import toggleAttendanceEvent from './toggleAttendanceEvent.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleAttendanceEvent('66bf6e5cc835c025c336f867', '66bf7a22b614ec85e11fdc09'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())