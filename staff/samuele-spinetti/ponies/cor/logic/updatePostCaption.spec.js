import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('updatePostCaption', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany({})
            .then(() => {
                Post.deleteMany()
                    .then(() => done())
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on existing user and post', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                Post.create({ author: 'monoloco', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
                    .then(post => {
                        updatePostCaption('monoloco', post.id, 'wtf, hello', error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            Post.findById(post.id).lean()
                                .then(post => {
                                    expect(post.caption).to.equal('wtf, hello')

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        Post.create({ author: 'monoloco', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
            .then(post => {
                updatePostCaption('monoloco', post.id, 'hello', error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('User not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user but non-existing post', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                updatePostCaption('monoloco', new ObjectId().toString(), 'hello', error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('Post not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            updatePostCaption(123, new ObjectId().toString(), 'hello', error => { })
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
            updatePostCaption('', new ObjectId().toString(), 'hello', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid username')
        }
    })

    it('fails on non-string postId', () => {
        let error

        try {
            updatePostCaption('Mono', 123, 'hello', error => { })
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
            updatePostCaption('Mono', '', 'hello', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid postId')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            updatePostCaption('monoloco', new ObjectId().toString(), 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Value is not a string')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            updatePostCaption('Mono', new ObjectId().toString(), 'hello', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Callback is not a function')
        }
    })


    afterEach(done => {
        User.deleteMany({})
            .then(() => {
                Post.deleteMany()
                    .then(() => done())
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })
})