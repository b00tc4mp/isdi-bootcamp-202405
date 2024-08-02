import 'dotenv/config'
import getAllPosts from './getAllPosts.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('getAllPosts', () => {
    before(() => { mongoose.connect(process.env.MONGODB_URI) })

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user listing all posts', () => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123', following: ['tatig'] })
            .then(user =>
                Post.create({ author: 'tatig', image: 'https://www.grupoxcaret.com/es/wp-content/uploads/2021/03/aves-boris.jpg', caption: 'pajaro azul' })
                    .then(post1 => {
                        Post.create({ author: 'tatig', image: 'https://www.grupoxcaret.com/es/wp-content/uploads/2021/03/aves-boris.jpg', caption: 'pajaro azul' })
                            .then(post2 => {
                                getAllPosts(user.username)

                                Post.find({}).lean()
                                    .then(posts => {
                                        expect(posts[0].author).to.equal(post1.author)
                                        expect(posts[1].author).to.equal(post2.author)

                                    })
                            })
                    })
            )
    })

    it('fails on non-existing user', () => {
        let _error

        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123', following: ['tatig'] })
            .catch(error => _error = error)
            .then(() => {
                getAllPosts('pepe', error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')
                })
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            getAllPosts(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            getAllPosts('a')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})