import 'dotenv/config'
import { NewsArticle } from '../data/models.js'

import { validate, errors } from '../../com/index.js'
const { SystemError } = errors

const pageSize = 8

export default query => {
    validate.string(query, 'query')

    const APIRequestUrl = `${process.env.NEWS_API_URL}/everything?q=${query}&pageSize=${pageSize}&language=en&apiKey=${process.env.NEWS_API_KEY}`

    return fetch(APIRequestUrl)
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(data => data)

            throw new SystemError('newsapi fails')
        })

        .then(data => {
            let articles = data.articles

            if (!articles || articles.length === 0) return []

            articles = articles.filter(article => article.title !== '[Removed]')

            const articlePromises = articles.map(article =>
                NewsArticle.create({
                    title: article.title,
                    image: article.urlToImage,
                    description: article.description,
                    url: article.url,
                    author: article.author,
                    publishedAt: new Date(article.publishedAt)
                })
                    .catch(error => {
                        if (error.code !== 11000)
                            throw new SystemError(error.message)
                    }))

            return Promise.all(articlePromises)
                .then(() => NewsArticle.find({}, { __v: 0 }).sort({ publishedAt: -1 }).lean())
                .then(articles => {
                    articles.forEach(article => {
                        article.id = article._id.toString()
                        delete article._id
                    })

                    return articles
                })
        })
}