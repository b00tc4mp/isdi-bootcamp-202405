import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError, OwnershipError } = errors

describe('deletePost', () => {
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

    it('succeds on delete post', done => {
        User.create({ name: 'Benito', surname: 'Camelas', email: 'benito@camelas.com', username: 'benitocamelas', password: '123123123' })
            .then(() => {
                Post.create({ author: 'benitocamelas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE6GuoEFbvz-TadDfpqVJmHykzyY75dCwqHg&s', caption: 'huroncito' })
                    .then(post => {
                        deletePost('benitocamelas', post.id, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            Post.findById(post.id)
                                .then(post => {
                                    expect(post).to.be.null

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on invalid username', done => {
        Post.create({ author: 'benitocamelas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE6GuoEFbvz-TadDfpqVJmHykzyY75dCwqHg&s', caption: 'huroncito' })
            .then(post => {
                deletePost('jagd', post.id, error => {
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
                deletePost('tatig', new ObjectId().toString(), error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('post not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user and post but post does not belog to user', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(user => {
                Post.create({ author: 'abtg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE6GuoEFbvz-TadDfpqVJmHykzyY75dCwqHg&s', caption: 'huroncito' })
                    .then(post => {
                        deletePost(user.username, post.id, error => {
                            expect(error).to.be.instanceOf(OwnershipError)
                            expect(error.message).to.equal('post does not belong to user')

                            done()
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on invalid postId', () => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(user => {
                Post.create({ author: 'abtg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE6GuoEFbvz-TadDfpqVJmHykzyY75dCwqHg&s', caption: 'huroncito' })
                    .then(post => {
                        deletePost(user.username, '213', error => {
                            expect(error).to.be.instanceOf(ValidationError)
                            expect(error.message).to.equal('invalid postId')

                            done()
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })


    it('fails on callback is not a function', done => {
        Post.create({ author: 'benitocamelas', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE6GuoEFbvz-TadDfpqVJmHykzyY75dCwqHg&s', caption: 'huroncito' })
            .then(post => {
                let error

                try {
                    deletePost('benitocamelas', post.id, 123)
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