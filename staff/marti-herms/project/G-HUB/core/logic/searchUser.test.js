import 'dotenv/config'
import mongoose from 'mongoose'

import searchGame from './searchGame.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchGame('66ba007f874aa7b84ec54491', 'eden'))
    .then(games => console.log(games))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())