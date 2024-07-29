import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

describe('deletePost', () => {
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

    it('succeeds on delete post', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                Post.create({ author: 'monoloco', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
                    .then(post1 => {
                        Post.create({ author: 'monoloco', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
                            .then(post2 => {
                                deletePost(user.username, post1.id, error => {
                                    if (error) {
                                        console.error(error)

                                        return
                                    }

                                    Post.find({}).lean()
                                        .then(posts => {
                                            expect(posts[0].author).to.equal(post2.author)

                                            done()
                                        })
                                        .catch(error => done(error))
                                })
                            })
                            .catch(error => done(error))
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        Post.create({ author: 'monoloco', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
            .then(post => {
                deletePost('monoloco', post.id, error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('User not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user but non-existing post', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                deletePost('monoloco', new ObjectId().toString(), error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('Post not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user and post but post does not belog to user', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                Post.create({ author: 'samuspine', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
                    .then(post => {
                        deletePost(user.username, post.id, error => {
                            expect(error).to.be.instanceOf(Error)
                            expect(error.message).to.equal('Post does not belong to user')

                            done()
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            deletePost(123, new ObjectId().toString(), error => { })
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
            deletePost('', new ObjectId().toString(), error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('Invalid username')
        }
    })

    it('fails on non-string postId', () => {
        let error

        try {
            deletePost('Mono', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('PostId is not a string')
        }
    })

    it('fails on invalid postId', () => {
        let error

        try {
            deletePost('Mono', '', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('Invalid postId')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            deletePost('Mono', new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
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