import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('toggleFavPost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user and post with no favs', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
                    .then(post => toggleFavPost(user.id, post.id)
                        .then(() => User.findOne({ username: 'monoloco' })
                            .then(user => expect(user.favs).to.include(post.id)
                            )
                        )
                    )
            )
    )

    it('succeeds on existing post and user with favs', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf', likes: [user.id] })
                    .then(post => {
                        user.favs.push(post.id)
                        return user.save()
                            .then(() => toggleFavPost(user.id, post.id))
                            .then(() => User.findOne({ username: 'monoloco' }).lean())
                            .then(user => expect(user.favs).to.not.include(post.id))
                    })
            )
    )


    it('fails on non-existing user', () => {
        let _error

        return Post.create({ author: new ObjectId().toString(), image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
            .then(post => toggleFavPost(new ObjectId().toString(), post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('User not found')
            })
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => toggleFavPost(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('Post not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            toggleFavPost(123, new ObjectId().toString())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('UserId is not a string')
        }
    })

    it('fails on non-string postId', () => {
        let error

        try {
            toggleFavPost(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('PostId is not a string')
        }
    })

    it('fails on invalid postId', () => {
        let error

        try {
            toggleFavPost(new ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid postId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})