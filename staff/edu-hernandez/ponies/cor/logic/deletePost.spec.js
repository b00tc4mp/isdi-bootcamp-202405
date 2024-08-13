import 'dotenv/config.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import deletePost from './deletePost.js'
import { errors } from 'com'

const { ObjectId } = Types
const { ValidationError } = errors

describe('deletePost', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany()
            .then(() => Post.deleteMany())
            .then(() => done())
            .catch(error => done(error))
    })

    it('success on deleting a post', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(post => Post.create({
                author: 'rfederer',
                image: 'https://example.com/image.gif',
                caption: 'anycaption'
            }))
            .then(post => {
                deletePost('rfederer', post.id.toString(),
                    error => {
                        if (error) {
                            console.log(error)

                            return done(error)
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

    it('fails on non-existing user', done => {
        Post.create({
            author: 'rfederer',
            image: 'https://example.com/image.gif',
            caption: 'anycaption'
        })
            .then(post => {
                deletePost(
                    'rfederer',
                    post._id.toString(),
                    error => {
                        expect(error).to.be.instanceOf(Error)
                        expect(error.message).to.equal('user not found')

                        done()
                    })
            })
            .catch(error => done(error))
    })

    it('fails on existing user but non-existing post', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => {
                deletePost(
                    'rfederer',
                    new ObjectId().toString(),
                    error => {
                        expect(error).to.be.instanceOf(Error)
                        expect(error.message).to.equal('post not found')

                        done()
                    })
            })
            .catch(error => done(error))
    })

    it('fails on existing user and post but does not belong to user', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(user => {
                User.create({
                    name: 'Novak',
                    surname: 'Djokovic',
                    email: 'novak@djokovic.com',
                    username: 'novakdj',
                    password: '123123123'
                })
                    .then(novakdj => {
                        return Post.create({
                            author: 'novakdj',
                            image: 'https://example.com/image.gif',
                            caption: 'forehander'
                        })
                            .then(post => ({ user, post }))
                    })
                    .then(({ user, post }) => {
                        deletePost(user.username, post.id, error => {
                            expect(error).to.be.instanceOf(Error)
                            expect(error.message).to.equal('post does not belong to user')
                            done()
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on invalid username', () => {
        let error

        try {
            deletePost('rf', new ObjectId().toString(), error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string username', () => {
        let error

        try {
            deletePost(12, new ObjectId().toString(), error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })


    it('fails on non-string postId', () => {
        let error

        try {
            deletePost('rfederer', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })
    debugger
    it('fails on invalid postId', () => {
        let error

        try {
            deletePost('rfederer', '', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid postId')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            deletePost(
                'rfederer',
                'https://example.com/image.gif',
                123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('callback is not a function')
        }
    })

    afterEach(done => {
        Post.deleteMany()
            .then(() => User.deleteMany())
            .then(() => done())
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })

})