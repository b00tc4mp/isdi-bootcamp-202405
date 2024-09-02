import 'dotenv/config'
import getAllSavedNews from './getAllSavedNews.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, NewsArticle } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getAllSavedNews', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), NewsArticle.deleteMany()]))

    it('succeeds on get all saved newsArticles', () => {
        return NewsArticle.create({
            title: "The Tasty nightclub had 'a bit of a Studio 54 vibe'. A police raid put it in the headlines1",
            image: 'https://live-production.wcms.abc-cdn.net.au/ec2270f94596dde9729877a7f6477b6c?impolicy=wcms_watermark_news&cropH=348&cropW=618&xPos=1&yPos=0&width=862&height=485&imformat=generic',
            description: `When dozens of police stormed one of Melbourne's most popular gay night spots three decades ago, what transpired was "pretty horrific".`,
            url: 'https://www.abc.net.au/news/2024-08-08/melbourne-tasty-raid-gay-community-victoria-police/104195430',
            author: 'Andie Noonan',
            publishedAt: '2024-08-07T22:34:47.000Z'
        })
            .then(news1 =>
                NewsArticle.create({
                    title: "The Tasty nightclub had 'a bit of a Studio 54 vibe'. A police raid put it in the headlines2",
                    image: 'https://live-production.wcms.abc-cdn.net.au/ec2270f94596dde9729877a7f6477b6c?impolicy=wcms_watermark_news&cropH=348&cropW=618&xPos=1&yPos=0&width=862&height=485&imformat=generic',
                    description: `When dozens of police stormed one of Melbourne's most popular gay night spots three decades ago, what transpired was "pretty horrific".`,
                    url: 'https://www.abc.net.au/news/2024-08-08/melbourne-tasty-raid-gay-community-victoria-police/104195430',
                    author: 'Andie Noonan',
                    publishedAt: '2024-08-07T22:34:47.000Z'
                })
                    .then(news2 =>
                        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samu', password: '123123123', favs: [news1.id, news2.id] })
                            .then(user => {
                                return getAllSavedNews(user.id)
                                    .then(() => User.findOne({ username: 'samu' }))
                                    .then(user => {
                                        expect(user.favs[0].toString()).to.equal(news1.id)
                                        expect(user.favs[1].toString()).to.equal(news2.id)
                                    })
                            })
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getAllSavedNews(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllSavedNews(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on ivalid userId', () => {
        let error

        try {
            getAllSavedNews(' ')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), NewsArticle.deleteMany()]))

    after(() => mongoose.disconnect())
})