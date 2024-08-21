import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Comment, Post } from '../data/models.js'
import errors from '../../com/errors.js'
import deleteComment from './deleteComment.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError, OwnershipError } = errors

describe('deleteComment', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Comment.deleteMany()]))
    it('succeeds on delete comment', () => {
        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif', text: 'hahahah ' })
                    .then(post =>
                        Comment.create({ author: user.id, post: post.id, text: 'hello' })
                            .then(comment1 =>
                                Comment.create({ author: user.id, post: post.id, text: 'yessss' })
                                    .then(comment2 =>
                                        deleteComment(user.id, comment1.id)
                                            .then(() => Comment.find({}).lean())
                                            .then(comments => {
                                                expect(comments).to.have.lengthOf(1);
                                                expect(comments[0].author.toString()).to.equal(comment2.author.toString());
                                            })
                                    )
                            )
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif', text: 'hello' })
                    .then(post =>
                        Comment.create({ author: new ObjectId().toString(), post: post.id, text: 'hello' })
                            .then(comment =>
                                deleteComment(new ObjectId().toString(), comment.id)
                            )
                    )
            )
            .catch(error => {
                _error = error
            })
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing comment', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif', text: 'hello' })
                    .then(post =>
                        Comment.create({ author: user.id, post: post.id, text: 'hello' })
                            .then(comment =>
                                deleteComment(user.id, new ObjectId().toString())
                            )
                    )
            )
            .catch(error => {
                _error = error
            })
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('comment not found')
            })
    })

    it('fails on existing user and comment but comment does not belong to user', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif', text: 'hello' })
                    .then(post =>
                        Comment.create({ author: new ObjectId().toString(), post: post.id, text: 'hello' })
                            .then(comment =>
                                deleteComment(user.id, comment.id)
                            )
                    )
            )
            .catch(error => {
                _error = error
            })
            .finally(() => {
                expect(_error).to.be.instanceOf(OwnershipError)
                expect(_error.message).to.equal('comment does not belong to user')
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

    afterEach(() => Promise.all([User.deleteMany(), Comment.deleteMany()]))

    after(() => mongoose.disconnect())
})