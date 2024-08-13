import 'dotenv/config.js'
import getAllFavPosts from './getAllFavPosts.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'

const { ObjectId } = Types

describe('getAllFavPost', () => {
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

    it('succeeds on existing user and post has favs', done => {
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
                caption: 'backhanders'
            }))
            .then(post => {
                getAllFavPosts(user.username, post.id, error => {
                    if (error) {
                        console.log(error)

                        return
                    }

                    User.findOne({ username: 'rfederer' })
                        .then(user => {
                            expect(user.favs).to.include(post.id)

                            done()
                        })
                        .catch(error => done(error))
                })
            })
            .catch(error => done(error))
    })

    it('fails on user not found', done => {
        getAllFavPosts('rfederer', error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')

            done()
        })
    })

    it('fails on invalid username', () => {
        let error

        try {
            getAllFavPosts('rf', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string username', () => {
        let error

        try {
            getAllFavPosts(123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            getAllFavPosts('rfederer', 23)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
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