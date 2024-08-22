import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import getNews from './getNews.js'
import { User, NewsArticle } from '../data/models.js'
import randomQuery from '../../app/util/randomQuery.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

const pageSize = 3

describe('getNews', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([NewsArticle.deleteMany(), User.deleteMany()]))

    it('succeeds on get News', () => {
        debugger

        const query = randomQuery()

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samu', password: '123123123' })
            .then(user => {

                const APIRequestUrl = `${process.env.NEWS_API_URL}/everything?q=${query}&pageSize=${pageSize}&language=en&apiKey=${process.env.API_KEY}`

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

                        return getNews(user.id, query)
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
    })

    it('fails on non-existing user', () => {
        let _error

        return NewsArticle.create([{ title: 'Women are using dating apps to discover their queer sexuality', image: 'https://helios-i.mashable.com/imagery/articles/01bHBrpoQHnFU7IMV26Fu5n/hero-image.fill.size_1248x702.v1723053133.jpg', description: 'During COVID lockdown in 2020 and 2021, Emma, now a 28-year-old in Cambridge, Massachusetts, discovered something unexpected on TikTok. Suddenly, her For You Page was full of content that would lead her to challenge her own identity: Cool lesbians. Emma, who chose to go by her first-name only for privacy reasons, had not allowed herself to engage with the part of her that desired women, though she always knew it was there, deep down.', url: 'https://mashable.com/article/women-are-using-dating-apps-to-discover-their-queer-sexuality', publishedAt: '2024-07-20T14:00:00.000Z' }])
            .then(() => getNews(new ObjectId().toString(), randomQuery()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })


    it('fails on non-string userId', () => {
        let error

        try {
            getNews(123, randomQuery())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on invalid userId', () => {
        let error

        try {
            getNews('', randomQuery())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string randomQuery', () => {
        let error

        try {
            getNews(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('query is not a string')
        }
    })

    afterEach(() => Promise.all([NewsArticle.deleteMany(), User.deleteMany()]))

    after(() => mongoose.disconnect())
})
