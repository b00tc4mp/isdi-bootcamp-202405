import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import getAllNews from './getAllNews.js'
import { User, NewsArticle } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getAllNews', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([NewsArticle.deleteMany(), User.deleteMany()]))

    it('succeeds on get all News', () =>
        NewsArticle.create([{ title: 'Women are using dating apps to discover their queer sexuality', image: 'https://helios-i.mashable.com/imagery/articles/01bHBrpoQHnFU7IMV26Fu5n/hero-image.fill.size_1248x702.v1723053133.jpg', description: 'During COVID lockdown in 2020 and 2021, Emma, now a 28-year-old in Cambridge, Massachusetts, discovered something unexpected on TikTok. Suddenly, her For You Page was full of content that would lead her to challenge her own identity: Cool lesbians. Emma, who chose to go by her first-name only for privacy reasons, had not allowed herself to engage with the part of her that desired women, though she always knew it was there, deep down.', url: 'https://mashable.com/article/women-are-using-dating-apps-to-discover-their-queer-sexuality', publishedAt: '2024-07-20T14:00:00.000Z' }])
            .then(() => User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
                .then(user => getAllNews(user.id))
                .then(hcr => expect(hcr[0].title).to.equal('Women are using dating apps to discover their queer sexuality'))
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return NewsArticle.create([{ title: 'Women are using dating apps to discover their queer sexuality', image: 'https://helios-i.mashable.com/imagery/articles/01bHBrpoQHnFU7IMV26Fu5n/hero-image.fill.size_1248x702.v1723053133.jpg', description: 'During COVID lockdown in 2020 and 2021, Emma, now a 28-year-old in Cambridge, Massachusetts, discovered something unexpected on TikTok. Suddenly, her For You Page was full of content that would lead her to challenge her own identity: Cool lesbians. Emma, who chose to go by her first-name only for privacy reasons, had not allowed herself to engage with the part of her that desired women, though she always knew it was there, deep down.', url: 'https://mashable.com/article/women-are-using-dating-apps-to-discover-their-queer-sexuality', publishedAt: '2024-07-20T14:00:00.000Z' }])
            .then(() => getAllNews(new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })


    it('fails on non-string userId', () => {
        let error

        try {
            getAllNews(123)
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
            getAllNews('')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    afterEach(() => Promise.all([NewsArticle.deleteMany(), User.deleteMany()]))

    after(() => mongoose.disconnect())
})
