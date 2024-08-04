import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFollowUser('66acfa254061e1e48d5eb954', '66adf6279f45573c51492c75'))
    .then(() => console.log('user follow toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
