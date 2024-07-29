import 'dotenv/config'
import getAllPosts from './getAllPosts.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getAllPosts', () => {
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

    it('succeeds on existing user listing all posts', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123', following: ['monoloco'] })
            .then(user => {
                Post.create({ author: 'monoloco', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
                    .then(post1 => {
                        Post.create({ author: 'monoloco', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
                            .then(post2 => {
                                getAllPosts(user.username, (error, posts) => {
                                    if (error) {
                                        console.error(error)

                                        return
                                    }

                                    console.log(posts)

                                    Post.find({}).lean()
                                        .then(posts => {
                                            expect(posts[0].author).to.equal(post1.author)
                                            expect(posts[1].author).to.equal(post2.author)

                                            done()
                                        })
                                        .catch(error => done(error))
                                })
                            })
                            .catch(erro => done(error))
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })


    it('fails on non-existing user', done => {
        getAllPosts('samuspine', (error, posts) => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('User not found')

            done()
        })
    })



    it('fails on non-string username', () => {
        let error

        try {
            getAllPosts(123, error => { })
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
            getAllPosts('', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid username')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            getAllPosts('Mono', 123)
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