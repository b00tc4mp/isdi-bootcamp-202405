import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Comment, Post } from '../data/models.js'
import { errors } from '../../com/index.js'
import createComment from './createComment.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('createComment', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]))

    it('succeeds on create comment', () => {
        let user
        let post

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(createdUser => {
                user = createdUser
                return Post.create({ author: user._id, text: 'hello' })
            })
            .then(createdPost => {
                post = createdPost
                return createComment(user._id.toString(), post._id.toString(), 'This is a test comment')
            })
            .then(() => {
                return Comment.findOne({ author: user._id })
            })
            .then(comment => {
                expect(comment).to.exist
                expect(comment.author.toString()).to.equal(user._id.toString())
                expect(comment.text).to.equal('This is a test comment')
                expect(comment.post.toString()).to.equal(post._id.toString())
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return Post.create({ author: new ObjectId(), text: 'hello' })
            .then(post => {
                return createComment(new ObjectId().toString(), post._id.toString(), 'yeeeahhh')
                    .catch(error => _error = error)
                    .finally(() => {
                        expect(_error).to.be.instanceOf(NotFoundError)
                        expect(_error.message).to.equal('user not found')
                    })
            })
    })

    it('fails on non-existing post', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                return createComment(user._id.toString(), new ObjectId().toString(), 'yeeeahhh')
                    .catch(error => _error = error)
                    .finally(() => {
                        expect(_error).to.be.instanceOf(NotFoundError)
                        expect(_error.message).to.equal('post not found')
                    })
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            createComment(123, new Types.ObjectId().toString(), 'yeeeahhh')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string postI', () => {
        let error

        try {
            createComment(new ObjectId().toString(), 123, 'yeeeahhh')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    it('fails on non-string text', () => {
        let error

        try {
            createComment(new ObjectId().toString(), new Types.ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('text is not a string')
        }
    })

    it('fails on invalid text', () => {
        let error

        try {
            createComment(new ObjectId().toString(), new Types.ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid text')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]))

    after(() => mongoose.disconnect())
})