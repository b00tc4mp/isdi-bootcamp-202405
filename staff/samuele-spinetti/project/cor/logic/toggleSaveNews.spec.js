import 'dotenv/config'
import toggleSaveNews from './toggleSaveNews.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, NewsArticle } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('toggleSaveNews', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), NewsArticle.deleteMany()]))

    it('succeeds on existing user and newsArticle with no favs', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                NewsArticle.create({ title: 'Women are using dating apps to discover their queer sexuality', urlToImage: 'https://helios-i.mashable.com/imagery/articles/01bHBrpoQHnFU7IMV26Fu5n/hero-image.fill.size_1248x702.v1723053133.jpg', description: 'During COVID lockdown in 2020 and 2021, Emma, now a 28-year-old in Cambridge, Massachusetts, discovered something unexpected on TikTok. Suddenly, her For You Page was full of content that would lead her to challenge her own identity: Cool lesbians. Emma, who chose to go by her first-name only for privacy reasons, had not allowed herself to engage with the part of her that desired women, though she always knew it was there, deep down.', url: 'https://mashable.com/article/women-are-using-dating-apps-to-discover-their-queer-sexuality', publishedAt: '2024-07-20T14:00:00.000Z' })
                    .then(newsArticle => toggleSaveNews(user.id, newsArticle.id)
                        .then(() => User.findOne({ username: 'monoloco' })
                            .then(user => expect(user.favs).to.include(newsArticle.id)
                            )
                        )
                    )
            )
    )

    it('succeeds on existing newsArticle and user with favs', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                NewsArticle.create({ title: 'Women are using dating apps to discover their queer sexuality', urlToImage: 'https://helios-i.mashable.com/imagery/articles/01bHBrpoQHnFU7IMV26Fu5n/hero-image.fill.size_1248x702.v1723053133.jpg', description: 'During COVID lockdown in 2020 and 2021, Emma, now a 28-year-old in Cambridge, Massachusetts, discovered something unexpected on TikTok. Suddenly, her For You Page was full of content that would lead her to challenge her own identity: Cool lesbians. Emma, who chose to go by her first-name only for privacy reasons, had not allowed herself to engage with the part of her that desired women, though she always knew it was there, deep down.', url: 'https://mashable.com/article/women-are-using-dating-apps-to-discover-their-queer-sexuality', publishedAt: '2024-07-20T14:00:00.000Z' })
                    .then(newsArticle => {
                        user.favs.push(newsArticle.id)
                        return user.save()
                            .then(() => toggleSaveNews(user.id, newsArticle.id))
                            .then(() => User.findOne({ username: 'monoloco' }).lean())
                            .then(user => expect(user.favs).to.not.include(newsArticle.id))
                    })
            )
    )


    it('fails on non-existing user', () => {
        let _error

        return NewsArticle.create({ title: 'Women are using dating apps to discover their queer sexuality', urlToImage: 'https://helios-i.mashable.com/imagery/articles/01bHBrpoQHnFU7IMV26Fu5n/hero-image.fill.size_1248x702.v1723053133.jpg', description: 'During COVID lockdown in 2020 and 2021, Emma, now a 28-year-old in Cambridge, Massachusetts, discovered something unexpected on TikTok. Suddenly, her For You Page was full of content that would lead her to challenge her own identity: Cool lesbians. Emma, who chose to go by her first-name only for privacy reasons, had not allowed herself to engage with the part of her that desired women, though she always knew it was there, deep down.', url: 'https://mashable.com/article/women-are-using-dating-apps-to-discover-their-queer-sexuality', publishedAt: '2024-07-20T14:00:00.000Z' })
            .then(newsArticle => toggleSaveNews(new ObjectId().toString(), newsArticle.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => toggleSaveNews(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('newsArticle not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            toggleSaveNews(123, new ObjectId().toString())
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
            toggleSaveNews('', new ObjectId().toString())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string newsId', () => {
        let error

        try {
            toggleSaveNews(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('newsId is not a string')
        }
    })

    it('fails on invalid newsId', () => {
        let error

        try {
            toggleSaveNews(new ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid newsId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), NewsArticle.deleteMany()]))

    after(() => mongoose.disconnect())
})