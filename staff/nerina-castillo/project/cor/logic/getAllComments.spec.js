import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post, Comment } from '../data/models.js'
import errors from '../../com/errors.js'
import getAllComments from './getAllComments.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('getAllComments', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]))

    it('succeeds on existing post listing all comments', () =>
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif', text: 'hello' })
                    .then(post =>
                        Comment.create({ author: user.id, post: post.id, text: 'yeaaahhh' })
                            .then(comment1 =>
                                Comment.create({ author: user.id, post: post.id, text: 'come on!' })
                                    .then(comment2 =>
                                        getAllComments(post.id)
                                            .then(comments => {
                                                expect(comments).to.have.lengthOf(2)
                                                expect(comments[0].author.id).to.equal(user.id)
                                                expect(comments[0].text).to.equal('yeaaahhh')
                                                expect(comments[1].author.id).to.equal(user.id)
                                                expect(comments[1].text).to.equal('come on!')
                                            })
                                    )
                            )
                    )
            )
    )

    it('fails on non-existing post', () => {
        let _error

        return getAllComments(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    it('fails on non-existing author', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif', text: 'hello' })
                    .then(post => {
                        return Comment.create({ author: new ObjectId().toString(), post: post.id, text: 'byeee' })
                            .then(() => {
                                return getAllComments(post.id)
                                    .catch(error => {
                                        _error = error
                                    })
                                    .finally(() => {
                                        expect(_error).to.be.instanceOf(NotFoundError)
                                        expect(_error.message).to.equal('author not found')
                                    })
                            })
                    })
            )
    })

    it('fails on non-string postId', () => {
        let error

        try {
            getAllComments(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]))

    after(() => mongoose.disconnect())
})