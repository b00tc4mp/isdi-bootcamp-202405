import 'dotenv/config'
import { User, NewsArticle } from '../data/models.js'

import randomQuery from '../../app/util/randomQuery.js'

import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

const pageSize = 3

export default (userId, query) => {
    validate.id(userId, 'userId')
    validate.string(query, 'query')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const APIRequestUrl = `${process.env.NEWS_API_URL}/everything?q=${query}&pageSize=${pageSize}&language=en&apiKey=${process.env.API_KEY}`

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
                    const articles = data.articles

                    if (!articles || articles.length === 0) return []

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
        })
}
