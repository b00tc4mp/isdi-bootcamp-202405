import 'dotenv/config'
import editPost from './editPost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

describe('editPost', () => {
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

    it('succeeds on existing user and caption changed', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                Post.create({ author: user.id, img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
                    .then(post => {
                        editPost('monoloco', post.id, 'it works', error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            Post.findById(post.id)
                                .then(post => {
                                    expect(post.caption).to.not.equal('wtf w testing')
                                    expect(post.caption).to.equal('it works')

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on existing user and caption is the same', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                Post.create({ author: user.id, img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
                    .then(post => {
                        editPost('monoloco', post.id, 'wtf w testing', error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            Post.findById(post.id)
                                .then(post => {
                                    expect(post.caption).to.equal('wtf w testing')

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
        Post.create({ author: new ObjectId(), img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
            .then(post => {
                editPost('monoloco', post.id, 'it works', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing post', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                editPost('monoloco', new ObjectId().toString(), 'it works', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('post not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on user being different from author', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123' })
                    .then(_user => {
                        Post.create({ author: _user.id, img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
                            .then(post => {
                                editPost('monoloco', post.id, 'it works', error => {
                                    expect(error).to.be.instanceOf(Error)
                                    expect(error.message).to.equal('post is not from user')

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
            editPost(123, 'ieufgwcerugcgwuwugn', 'it works', error => { })
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
            editPost('', 'ieufgwcerugcgwuwugn', 'it works', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string id', () => {
        let error

        try {
            editPost('monoloco', 123, 'it works', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('id is not a string')
        }
    })

    it('fails on invalid id', () => {
        let error

        try {
            editPost('monoloco', '', 'it works', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid id')
        }
    })

    it('fails on non-string newCaption', () => {
        let error

        try {
            editPost('monoloco', 'ieufgwcerugcgwuwugn', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('newCaption is not a string')
        }
    })

    it('fails on invalid newCaption', () => {
        let error

        try {
            editPost('monoloco', 'ieufgwcerugcgwuwugn', '', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid newCaption')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            editPost('monoloco', 'ieufgwcerugcgwuwugn', 'it works', 123)
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