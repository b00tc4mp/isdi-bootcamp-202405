import 'dotenv/config'
import toggleProductEnable from './toggleProductEnable.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleProductEnable('66c74c8a360cfce07e79b9a2', '66c87387eaefe470e8ae6498'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())