import 'dotenv/config'
import getNews from './getNews.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getNews('66bf5d6a09103dc282358bdf'))
    .then(newsArticles => console.log(newsArticles))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

