import 'dotenv/config'
import getAllPosts from './getAllPosts.js'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('getAllPosts', () => {
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

    it('succeeds on existing user', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                Post.create({ author: 'monoloco', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
                    .then(post => {
                        getAllPosts(user.username, error => { // el post.id es una atajo que te crea mongoose
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'monoloco' })
                                .then(user => { // traigo a este usuario de la base de datos
                                    expect(user.username).to.include(post.id)

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            getAllPosts(123, 'monoloco', error => { })
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
            getAllPosts('', 'monoloco', error => { })
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
            getAllPosts('monoloco', 'monoloco', 123)
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