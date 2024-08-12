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
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                createPost(user.id, 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'wtf')
                    .then(() => Post.findOne({ author: user.id })
                        .then(post => {
                            expect(post.author.toString()).to.equal(user.id)
                            expect(post.image).to.equal('https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
                            expect(post.caption).to.equal('wtf')
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
                expect(_error.message).to.equal('User not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            createPost(123, 'http://text', 'Hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('UserId is not a string')
        }
    })

    it('fails on non-string image', () => {
        let error

        try {
            createPost(new ObjectId().toString(), 123, 'Hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on invalid image', () => {
        let error

        try {
            createPost(new ObjectId().toString(), 'htpp://text', 'Hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid image')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            createPost(new ObjectId().toString(), 'http://', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Caption is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany, Post.deleteMany()]))

    after(() => mongoose.disconnect())
})