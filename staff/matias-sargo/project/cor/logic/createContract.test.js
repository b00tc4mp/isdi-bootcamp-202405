import 'dotenv/config'
import createContract from './createContract.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createContract('66cc628513c363671eedbd0d', '66cd84c564d763f19ce6d197', '66d0180a4068a461f7263638',new Date('2024-09-01T00:00:00.000Z'),new Date('2025-09-01T00:00:00.000Z'),2500))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())