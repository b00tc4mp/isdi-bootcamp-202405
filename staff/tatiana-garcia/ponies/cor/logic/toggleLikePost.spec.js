import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('toggleLikePost', () => {
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
                    .catch(() => done(error))
            })
            .catch(error => done(error))
    })

    it('succesds on existing user and post has no likes', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => {
                Post.create({ author: 'tatig', image: 'https://www.portalveterinaria.com/upload/20200204085416hedgehog-child-1759027_1920.jpg', caption: 'erizo' })
                    .then(post => {
                        toggleLikePost('tatig', post.id, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            Post.findById(post.id).lean()
                                .then(post => {
                                    expect(post.likes).to.include('tatig')

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succes on existing user and post has likes', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => {
                Post.create({ author: 'tatig', image: 'https://www.portalveterinaria.com/upload/20200204085416hedgehog-child-1759027_1920.jpg', caption: 'erizo', likes: ['tatig'] })
                    .then(post => {
                        toggleLikePost('tatig', post.id, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            Post.findById(post.id).lean()
                                .then(post => {
                                    expect(post.likes).to.not.include('tatig')

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
        Post.create({ author: 'tatig', image: 'https://www.portalveterinaria.com/upload/20200204085416hedgehog-child-1759027_1920.jpg', caption: 'erizo' })
            .then(post => {
                toggleLikePost('tatig', post.id, error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user but non-existing post', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => {
                toggleLikePost('tatig', new ObjectId().toString(), error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('post not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-function callback', done => {
        Post.create({ author: 'tatig', image: 'https://www.portalveterinaria.com/upload/20200204085416hedgehog-child-1759027_1920.jpg', caption: 'erizo' })
            .then(post => {
                let error

                try {
                    toggleLikePost('tatig', post.id, 123)
                } catch (_error) {
                    error = _error
                } finally {
                    expect(error).to.be.instanceOf(ValidationError)
                    expect(error.message).to.equal('callback is not a function')

                    done()

                }
            })
            .catch(error => done(error))

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