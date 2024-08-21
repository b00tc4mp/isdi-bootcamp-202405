import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import createPost from './createPost.js'
import { User, Post } from '../data/models.js'

import errors from '../../com/errors.js'
const { ValidationError, NotFoundError } = errors

describe('createPost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on new post', () =>
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(user =>
                createPost(user.id, 'help')
                    .then(() => Post.findOne({ author: user.id })
                        .then(post => {
                            expect(post.author.toString()).to.equal(user.id)
                            expect(post.caption).to.equal('help')
                        })
                    )
            )
    )


    it('fails on non-existing user', () => {
        let _error

        return createPost(new ObjectId().toString(), 'http://text', 'Hello')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            createPost(123, 'Hello')
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
            createPost('', 'Hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            createPost(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('caption is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany, Post.deleteMany()]))

    after(() => mongoose.disconnect())
})