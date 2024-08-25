import 'dotenv/config'
import getPostComments from './getPostComments.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post, Comment } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getPostComments', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Comment.deleteMany()]))

    it('succeeds on existing user listing all comments', () => {
        const postId = new ObjectId().toString()

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(user =>
                Comment.create({ author: user.id, text: 'hola', post: postId })
                    .then(() => getPostComments(user.id, postId))
                    .then(comments => {
                        expect(comments[0].author).to.equal(user.id)
                        expect(comments[0].text).to.equal('hola')
                        expect(comments[0].post.toString()).to.equal(postId)
                    })
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getPostComments(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getPostComments(123, new ObjectId().toString())
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
            getPostComments('', new ObjectId().toString())
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
            getPostComments(new ObjectId().toString(), 123)
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
            getPostComments(new ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid postId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Comment.deleteMany()]))

    after(() => mongoose.disconnect())
})