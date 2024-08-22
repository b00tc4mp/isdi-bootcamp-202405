import 'dotenv/config'
import deleteComment from './deleteComment.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Comment } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError, OwnerShipError } = errors

describe('deleteComment', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Comment.deleteMany()]))

    it('succeeds on delete comment', () => {
        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samu', password: '123123123' })
            .then(user =>
                Comment.create({ author: user.id, text: 'wtf', post: new ObjectId().toString() })
                    .then(comment1 =>
                        Comment.create({ author: user.id, text: 'wtf2', post: new ObjectId().toString() })
                            .then(comment2 =>
                                deleteComment(user.id, comment2.id)
                                    .then(() => Comment.find({}).lean())
                                    .then(comments => {
                                        expect(comments[0].author.toString()).to.equal(comment1.author.toString())
                                    })
                            )
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return Comment.create({ author: new ObjectId().toString(), text: 'hello', post: new ObjectId().toString() })
            .then(comment => deleteComment(new ObjectId().toString(), comment.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing comment', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samu', password: '123123123' })
            .then(user => deleteComment(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('comment not found')
            })
    })

    it('fails on existing user and post but comment does not belog to user', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samu', password: '123123123' })
            .then(user => {
                return Comment.create({ author: new ObjectId().toString(), text: 'hello', post: new ObjectId().toString() })
                    .then(comment => deleteComment(user.id, comment.id))
                    .catch(error => _error = error)
                    .finally(() => {
                        expect(_error).to.be.instanceOf(OwnerShipError)
                        expect(_error.message).to.equal('comment does not belong to user')
                    })
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            deleteComment(123, new ObjectId().toString())
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
            deleteComment('', new ObjectId().toString())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string commentId', () => {
        let error

        try {
            deleteComment(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('commentId is not a string')
        }
    })

    it('fails on invalid commentId', () => {
        let error

        try {
            deleteComment(new ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid commentId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Comment.deleteMany()]))

    after(() => mongoose.disconnect())
})