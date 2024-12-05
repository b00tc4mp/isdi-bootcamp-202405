import 'dotenv/config'
import getAllFavPosts from './getAllFavPosts.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import errors from '../../com/errors.js'
const { ValidationError } = errors

describe('getAllFavPosts', () => {
    before(() => { mongoose.connect(process.env.MONGODB_URI) })

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user listing all fav posts', () => {
        Post.create({ author: 'tatig', image: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/044D/production/_103710110_0a.gettyimages-897584432.jpg.webp', caption: 'carlino' })
            .then(post => {
                User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123', favs: [post.id] })
                    .then(user => getAllFavPosts(user.username))
                User.findOne({ username: 'tatig' })
                    .then(user => expect(user.favs).to.include(post.id))
            })
    })

    it('fails on invalid username', () => {
        let error

        try {
            getAllFavPosts('')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string username', () => {
        let error

        try {
            getAllFavPosts(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})