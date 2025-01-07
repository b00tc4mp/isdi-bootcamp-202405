import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('66acb2db1f5dbdd3ba4e3efc', '66acb7c4d3462e42d6171873'))
    .then(() => console.log('fav event toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())