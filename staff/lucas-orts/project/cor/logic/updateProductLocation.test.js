import 'dotenv/config'
import updateProductLocation from './updateProductLocation.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateProductLocation('66e06099e4226e4fcf150aad', '66e06246c99dbf3e2ac22df2', { type: 'Point', coordinates: [42.38249928035046, 5.152969735831627] }))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())