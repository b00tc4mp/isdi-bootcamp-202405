import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import createPost from './createPost.js'
import { User, Post } from '../data/models.js'

describe('createPost', () => {
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

    it('succeeds on new post', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                createPost(user.username, 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'wtf', error => {
                    if (error) {
                        done(error)

                        return
                    }

                    Post.findOne({ author: user.username })
                        .then(post => {
                            expect(post.author).to.equal('monoloco')
                            expect(post.image).to.equal('https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
                            expect(post.caption).to.equal('wtf')

                            done()
                        })
                        .catch(error => done(error))
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        createPost('monoloco', 'http://text', 'Hello', error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('User not found')

            done()
        })
    })

    it('fails on non-string username', () => {
        let error

        try {
            createPost(123, 'http://text', 'Hello', error => { })
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
            createPost('', 'http://text', 'Hello', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('Invalid username')
        }
    })

    it('fails on non-string image', () => {
        let error

        try {
            createPost('monoloco', 123, 'Hello', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on invalid image', () => {
        let error

        try {
            createPost('monoloco', 'htpp://text', 'Hello', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('Invalid image')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            createPost('monoloco', 'http://', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('Caption is not a string')
        }
    })


    it('fails on non-function callback', () => {
        let error

        try {
            createPost('monoloco', 'http://text', 'Hello', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('Callback is not a function')
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