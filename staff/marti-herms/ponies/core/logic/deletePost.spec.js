import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import deletePost from './deletePost.js'
import { User, Post } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, OwnershipError, ValidationError } = errors

describe('deletePost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on post deleted', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => Post.create({ author: user.id, img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' }))
            .then(post => {
                return deletePost('monoloco', post.id)
                    .then(() => User.findOne({ username: 'monoloco' }))
                    .then(user =>
                        Post.findById(post.id)
                            .then(_post => {
                                expect(_post).to.be.null
                                expect(user.posts).to.not.include(post.id)
                            })
                    )
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return Post.create({ author: new ObjectId(), img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
            .then(post => deletePost('monoloco', post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing post', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => deletePost('monoloco', new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    it('fails on existing user but is not author', () => {
        let _error
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                return User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123' })
                    .then(_user => {
                        return Post.create({ author: user.id, img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
                            .then(post => deletePost('eden', post.id))
                    })
            })
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(OwnershipError)
                expect(_error.message).to.equal('user is not author')
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            deletePost(123, 'cnwoicvwij')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            deletePost('', 'ocfhweuchwc')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string postId', () => {
        let error

        try {
            deletePost('monoloco', 123)
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
            deletePost('monoloco', '')
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