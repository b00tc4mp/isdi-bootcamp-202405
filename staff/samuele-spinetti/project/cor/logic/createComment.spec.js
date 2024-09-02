import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import createComment from './createComment.js'
import { User, Post, Comment } from '../data/models.js'

import errors from '../../com/errors.js'
const { ValidationError, NotFoundError } = errors

describe('createComment', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]))

    it('succeeds on new comment', () =>
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, caption: 'wtf' })
                    .then(post =>
                        createComment(user.id, post.id, 'help')
                            .then(() => Comment.find({ author: user.id })
                                .then(comments => {
                                    expect(comments[0].author.toString()).to.equal(user.id)
                                    expect(comments[0].text).to.equal('help')
                                    expect(comments[0].post.toString()).to.equal(post.id)
                                })
                            )
                    )
            )
    )


    it('fails on non-existing user', () => {
        let _error

        return createComment(new ObjectId().toString(), new ObjectId().toString(), 'Hello')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing post', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(user => createComment(user.id, new ObjectId().toString(), 'Hello'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            createComment(123, new ObjectId().toString(), 'Hello')
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
            createComment('', new ObjectId().toString(), 'Hello')
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
            createComment(new ObjectId().toString(), 123, 'Hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    it('fails on ivalid postId', () => {
        let error

        try {
            createComment(new ObjectId().toString(), '', 'Hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid postId')
        }
    })

    it('fails on non-string text', () => {
        let error

        try {
            createComment(new ObjectId().toString(), new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('text is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany, Post.deleteMany(), Comment.deleteMany()]))

    after(() => mongoose.disconnect())
})