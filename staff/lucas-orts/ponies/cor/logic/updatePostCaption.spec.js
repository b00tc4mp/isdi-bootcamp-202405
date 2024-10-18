import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
import mongoose, { Types } from 'mongoose'

import { errors } from 'com'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

const { NotFoundError, OwnershipError, ValidationError } = errors

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
        User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123' })
            .then(() => {
                Post.create({ author: 'Tomasturbao', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'hola' })
                    .then(post => {
                        updatePostCaption('Tomasturbao', post.id, 'hola soy Tomas', error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            Post.findById(post.id).lean()
                                .then(post => {
                                    expect(post.caption).to.equal('hola soy Tomas')

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on existing user and post but post does not belog to user', done => {
        User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123' })
            .then(user => {
                User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', username: 'Estercolero', password: '123123123' })
                    .then(() => {
                        Post.create({ author: 'Estercolero', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'hola' })
                            .then(post => {
                                updatePostCaption(user.username, post.id, 'hola mundo', error => {
                                    expect(error).to.be.instanceOf(OwnershipError)
                                    expect(error.message).to.equal('post does not belong to user')

                                    done()
                                })
                            })
                            .catch(error => done(error))
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        Post.create({ author: 'Tomasturbao', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'hola' })
            .then(post => {
                updatePostCaption('Tomasturbao', post.id, 'hola soy Tomas', error => {
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
                updatePostCaption('Tomasturbao', new ObjectId().toString(), 'hola soy Tomas', error => {
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
            updatePostCaption(123, new ObjectId().toString(), 'hola soy Tomas', error => { })
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
            updatePostCaption('', new ObjectId().toString(), 'hola soy Tomas', error => { })
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
            updatePostCaption('Tomasturbao', 123, 'hola soy Tomas', error => { })
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
            updatePostCaption('Tomasturbao', '', 'hola soy Tomas', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid postId')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            updatePostCaption('Tomasturbao', new ObjectId().toString(), 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('caption is not a string')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            updatePostCaption('Tomasturbao', new ObjectId().toString(), 'hola soy Tomas', 123)
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