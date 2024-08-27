import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import getNews from './getNews.js'
import { NewsArticle } from '../data/models.js'
import randomQuery from '../../app/util/randomQuery.js'

import errors from '../../com/errors.js'
const { ValidationError, SystemError } = errors

const pageSize = 3

describe('getNews', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([NewsArticle.deleteMany()]))

    it('succeeds on get News', () => {
        debugger
        const query = randomQuery()

        const APIRequestUrl = `${process.env.NEWS_API_URL}/everything?q=${query}&pageSize=${pageSize}&language=en&apiKey=${process.env.NEWS_API_KEY}`

        return fetch(APIRequestUrl)
            .then(response => {
                const { status } = response

                if (status === 200) {
                    return response.json().then(data => {
                        return data
                    });
                }

                throw new SystemError('newsapi fails')
            })
            .then(data => {
                const articles = data.articles

                if (!articles || articles.length === 0) {
                    return []
                }

                return getNews(query)
                    .then(() => NewsArticle.find({}).lean()
                        .then(newsArticles => {
                            articles.forEach(article => {
                                const resultTitle = newsArticles.find(({ title }) => title === article.title)
                                expect(resultTitle.title).to.equal(article.title)
                                expect(resultTitle.author).to.equal(article.author)
                                expect(resultTitle.image).to.equal(article.urlToImage)
                                expect(resultTitle.description).to.equal(article.description)
                                expect(resultTitle.url).to.equal(article.url)
                                expect(resultTitle.publishedAt.toISOString()).to.equal(new Date(article.publishedAt).toISOString())
                            })
                        })
                    )
            })
    })


    it('fails on non-string randomQuery', () => {
        let error

        try {
            getNews(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('query is not a string')
        }
    })

    afterEach(() => Promise.all([NewsArticle.deleteMany()]))

    after(() => mongoose.disconnect())
})
