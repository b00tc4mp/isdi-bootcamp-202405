import 'dotenv/config'
import getDocument from './getDocument.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getDocument('66cd84c564d763f19ce6d19f', 'contract'))
    .then(events => console.log(events))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
