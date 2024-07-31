import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose, { Types } from 'mongoose'

import { errors } from 'com'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

const { NotFoundError, ValidationError } = errors

describe('toggleLikePost', () => {
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

    it('succeeds on existing user and post with no likes', done => {
        User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123' })
            .then(() => {
                Post.create({ author: 'Tomasturbao', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
                    .then(post => {
                        toggleLikePost('Tomasturbao', post.id, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            Post.findById(post.id).lean()
                                .then(post => {
                                    expect(post.likes).to.include('Tomasturbao')

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on existing user and post with likes', done => {
        User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123' })
            .then(() => {
                Post.create({ author: 'Tomasturbao', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf', likes: ['Tomasturbao'] })
                    .then(post => {
                        toggleLikePost('Tomasturbao', post.id, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            Post.findById(post.id).lean()
                                .then(post => {
                                    expect(post.likes).to.not.include('Tomasturbao')

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
        Post.create({ author: 'Tomasturbao', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
            .then(post => {
                toggleLikePost('Tomasturbao', post.id, error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user but non-existing post', done => {
        User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123' })
            .then(() => {
                toggleLikePost('Tomasturbao', new ObjectId().toString(), error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('post not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            toggleLikePost(123, new ObjectId().toString(), error => { })
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
            toggleLikePost('', new ObjectId().toString(), error => { })
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
            toggleLikePost('Tomasturbao', 123, error => { })
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
            toggleLikePost('Tomasturbao', '', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid postId')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            toggleLikePost('Tomasturbao', new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('callback is not a function')
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