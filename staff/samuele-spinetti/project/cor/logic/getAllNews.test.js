import 'dotenv/config'
import getAllNews from './getAllNews.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllNews('66bb82d975b3a0e1bc15be0b'))
    .then(newsArticles => console.log(newsArticles))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

