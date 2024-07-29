import 'dotenv/config'
import getUserPosts from './getUserPosts.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

describe('getUserPosts', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany()
            .then(() => {
                Post.deleteMany()
                    .then(() => done())
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on existing user returning all posts from target user', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123' })
                    .then(_user => {
                        Post.create({ author: user.id, img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
                            .then(post => {
                                Post.create({ author: _user.id, img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
                                    .then(_post => {
                                        getUserPosts('monoloco', 'eden', (error, posts) => {
                                            if (error) {
                                                console.error(error)

                                                return
                                            }
                                            expect(posts).to.be.an('array')
                                            expect(posts[0].id).to.equal(_post.id)
                                            expect(posts.length).to.equal(1)

                                            done()
                                        })
                                    })
                                    .catch(error => done(error))
                            })
                            .catch(error => done(error))
                    })
                    .catch(error => done(error))

            })
            .catch(error => done(error))

    })

    it('succeeds on existing user and no posts returning empty array ', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                getUserPosts('monoloco', 'monoloco', (error, posts) => {
                    if (error) {
                        console.error(error)

                        return
                    }

                    expect(posts).to.be.an('array')
                    expect(posts.length).to.equal(0)

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        Post.create({ author: new ObjectId(), img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
            .then(post => {
                getUserPosts('monoloco', 'eden', (error, posts) => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            getUserPosts(123, 'eden', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            getUserPosts('', 'eden', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string targetUsername', () => {
        let error

        try {
            getUserPosts('monoloco', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('targetUsername is not a string')
        }
    })

    it('fails on invalid targetUsername', () => {
        let error

        try {
            getUserPosts('monoloco', '', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid targetUsername')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            getUserPosts('monoloco', 'eden', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('callback is not a function')
        }
    })

    afterEach(done => {
        User.deleteMany()
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