import 'dotenv/config'
import toggleAttendanceEvent from './toggleAttendanceEvent.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleAttendanceEvent('66cc80613bc6b894d4cd0583', '66cc809a15388d7bf82983eb'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())