import 'dotenv/config'
import getAllPosts from './getAllPosts.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getAllPosts', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user listing all posts', () => {
        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, caption: 'help1' })
                    .then(post1 =>
                        Post.create({ author: user.id, caption: 'help2' })
                            .then(post2 =>
                                getAllPosts(user.id)
                                    .then(posts => {
                                        expect(posts[0].author.id).to.equal(user.id)
                                        expect(posts[1].author.id).to.equal(user.id)
                                        expect(posts[0].caption).to.equal('help2')
                                        expect(posts[1].caption).to.equal('help1')
                                    })
                            )
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getAllPosts(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllPosts(123)
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
            getAllPosts('')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})