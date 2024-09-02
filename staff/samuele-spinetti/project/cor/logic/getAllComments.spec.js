import 'dotenv/config'
import getAllComments from './getAllComments.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post, Comment } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getAllComments', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]))

    it('succeeds on existing user listing all comments', () => {

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, caption: 'help1' })
                    .then(post =>
                        Comment.create({ author: user.id, text: 'hola', post: post.id })
                            .then(() => getAllComments(user.id, post.id))
                            .then(comments => {
                                expect(comments[0].author).to.equal(user.id)
                                expect(comments[0].text).to.equal('hola')
                                expect(comments[0].post.toString()).to.equal(post.id)
                            })
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getAllComments(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing post', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(user => getAllComments(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllComments(123, new ObjectId().toString())
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
            getAllComments('', new ObjectId().toString())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string postId', () => {
        let error

        try {
            getAllComments(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    it('fails on invalid postId', () => {
        let error

        try {
            getAllComments(new ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid postId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]))

    after(() => mongoose.disconnect())
})