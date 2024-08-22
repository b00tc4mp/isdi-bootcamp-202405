import 'dotenv/config'
import getNews from './getNews.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getNews('66c7593f07281533164b2795', 'lgtbi'))
    .then(newsArticles => console.log(newsArticles))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

