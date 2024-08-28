import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import { errors } from '../../com/index.js'
import toggleLikePost from './toggleLikePost.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('toggleLikePost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user and post with no likes', () =>
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'hello' })
                    .then(post =>
                        toggleLikePost(user.id, post.id)
                            .then(() => Post.findById(post.id).lean())
                            .then(post => expect(post.likes.map(userObjectId => userObjectId.toString())).to.include(user.id))
                    )
            )
    )

    it('succeeds on existing user and post with likes', () =>
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'hello', likes: [user.id] })
                    .then(post =>
                        toggleLikePost(user.id, post.id)
                            .then(() => Post.findById(post.id).lean())
                            .then(post => expect(post.likes).to.not.include(user.username))
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        const userObjectId = new ObjectId

        return Post.create({ author: userObjectId, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'hello' })
            .then(post => toggleLikePost(userObjectId.toString(), post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
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

    it('fails on non-string postId', () => {
        let error

        try {
            toggleLikePost('gonzalo', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})