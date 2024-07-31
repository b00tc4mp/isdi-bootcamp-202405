import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import deletePost from './deletePost.js'
import { User, Post } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, OwnershipError, ValidationError } = errors

describe('deletePost', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany({})
            .then(() => done())
            .catch(error => done(error))
    })

    it('succeeds on post deleted', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                Post.create({ author: user.id, img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
                    .then(post => {
                        deletePost('monoloco', post.id, error => {
                            if (error) {
                                done(error)

                                return
                            }

                            User.findOne({ username: 'monoloco' })
                                .then(user => {
                                    Post.findById(post.id)
                                        .then(_post => {
                                            expect(_post).to.be.null
                                            expect(user.posts).to.not.include(post.id)

                                            done()
                                        })
                                        .catch(error => done(error))
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))


    })

    it('fails on non-existing user', done => {
        Post.create({ author: new ObjectId(), img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
            .then(post => {
                deletePost('monoloco', post.id, error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user but is not author', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123' })
                    .then(_user => {
                        Post.create({ author: user.id, img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
                            .then(post => {
                                deletePost('eden', post.id, error => {
                                    expect(error).to.be.instanceOf(OwnershipError)
                                    expect(error.message).to.equal('user is not author')

                                    done()
                                })
                            })
                            .catch(error => done(error))
                    })
                    .catch(error => done(error))

            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            deletePost(123, 'cnwoicvwij', error => { })
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
            deletePost('', 'ocfhweuchwc', error => { })
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
            deletePost('monoloco', 123, error => { })
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
            deletePost('monoloco', '', error => { })
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
            deletePost('monoloco', 'cjcujcaucbacnaik', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('callback is not a function')
        }
    })

    afterEach(done => {
        User.deleteMany({})
            .then(() => done())
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })
})