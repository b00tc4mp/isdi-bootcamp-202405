import 'dotenv/config'
import getAllNews from './getAllNews.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllNews('66cda1786dad81a083c9afd5'))
    .then(newsArticles => console.log(newsArticles))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

