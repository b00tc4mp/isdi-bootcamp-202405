import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('toggleLikePost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()])
    )

    it('succeeds on existing user and post with no likes', () =>
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, caption: 'wtf' })
                    .then(post =>
                        toggleLikePost(user.id, post.id)
                            .then(() => Post.findById(post.id).lean())
                            .then(post => expect(post.likes.map(userObjectId => userObjectId.toString())).to.include(user.id))
                    )
            )
    )

    it('succeeds on existing user and post with likes', () =>
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, caption: 'wtf', likes: [user.id] })
                    .then(post =>
                        toggleLikePost(user.id, post.id)
                            .then(() => Post.findById(post.id).lean())
                            .then(post => expect(post.likes).to.not.include(user.id))
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        const userObjectId = new ObjectId

        return Post.create({ author: userObjectId, caption: 'wtf' })
            .then(post => toggleLikePost(userObjectId.toString(), post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(user => toggleLikePost(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            toggleLikePost(123, new ObjectId().toString())
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
            toggleLikePost('', new ObjectId().toString())
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
            toggleLikePost(new ObjectId().toString(), 123)
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
            toggleLikePost(new ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid postId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})