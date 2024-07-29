import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'
const { ValidationError, NotFoundError } = errors

describe('toggleFavPost', () => {
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

    it('succeeds on existing user and post has no favs', done => {
        User.create({ name: 'alberto', surname: 'garcia', email: 'abt@garcia.com', username: 'abtg', password: '123123123' })
            .then(user => {
                Post.create({ author: 'abtg', image: 'https://www.fundacionaquae.org/wp-content/uploads/2018/10/proteger-a-los-animales.jpg', caption: 'mapache' })
                    .then(post => {
                        toggleFavPost(user.username, post.id, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'abtg' })
                                .then(user => {
                                    expect(user.favs).to.include(post.id)

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succes on existing user and post with favs', done => {
        Post.create({ author: 'abtg', image: 'https://www.fundacionaquae.org/wp-content/uploads/2018/10/proteger-a-los-animales.jpg', caption: 'mapache' })
            .then(post => {
                User.create({ name: 'alberto', surname: 'garcia', email: 'abt@garcia.com', username: 'abtg', password: '123123123', favs: [post.id] })
                    .then(() => {
                        toggleFavPost('abtg', post.id, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'abtg' }).lean()
                                .then(user => {
                                    expect(user.favs).to.not.include(post.id)

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
        Post.create({ author: 'abtg', image: 'https://www.fundacionaquae.org/wp-content/uploads/2018/10/proteger-a-los-animales.jpg', caption: 'mapache' })
            .then(post => {
                toggleFavPost('abtg', post.id, error => {
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
                toggleFavPost('tatig', new ObjectId().toString(), error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('post not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on callback is not a function', done => {
        Post.create({ author: 'abtg', image: 'https://www.fundacionaquae.org/wp-content/uploads/2018/10/proteger-a-los-animales.jpg', caption: 'mapache' })
            .then(post => {
                let error

                try {
                    toggleFavPost('abtg', post.id, 121)
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