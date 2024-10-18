import 'dotenv/config'
import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'
import mongoose, { Types } from 'mongoose'

import { errors } from 'com'

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

const { NotFoundError, ValidationError } = errors

describe('getAllFollowingUserPosts', () => {
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

    it('succeeds on existing user listing all following posts', done => {
        Post.create({ author: 'Tomasturbao', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'hola' })
            .then(post => {
                User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123', following: ['Tomasturbao'] })
                    .then(user => {
                        getAllFollowingUserPosts(user.username, (error, posts) => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'Tomasturbao' }).lean()
                                .then(user => {
                                    expect(user.following).to.include(post.author)

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
        getAllFollowingUserPosts('Estercolero', (error, posts) => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')

            done()
        })
    })



    it('fails on non-string username', () => {
        let error

        try {
            getAllFollowingUserPosts(123, error => { })
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
            getAllFollowingUserPosts('', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            getAllFollowingUserPosts('Tomasturbao', 123)
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