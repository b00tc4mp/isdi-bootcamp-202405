import 'dotenv/config'
import { User, NewsArticle } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

const querys = ['LGBTQI+', 'lgbtqi+', 'gay', 'lesbian', 'homosexual', 'LGBTQ health', 'queer', 'gay pride']
const query = querys[Math.floor(Math.random() * querys.length)]

const API_KEY = 'ff0fbb8fbbcb42fb8677c064c4c35732'
const NEWS_API_URL = 'https://newsapi.org/v2'

const pageSize = 5

const APIRequestUrl = `${NEWS_API_URL}/everything?q=${query}&pageSize=${pageSize}&language=en&apiKey=${API_KEY}`

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return fetch(APIRequestUrl)
                .catch(error => { throw new SystemError(error.message) })
                .then((response) => {
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
                        .then(() => NewsArticle.find({}, { __v: 0 }).sort({ date: -1 }).lean())
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
