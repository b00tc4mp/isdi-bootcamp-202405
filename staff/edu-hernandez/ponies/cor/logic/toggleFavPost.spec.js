import 'dotenv/config.js'
import toggleFavPost from './toggleFavPost.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
const { ObjectId } = Types

describe('toggleFavPost', () => {
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


    it('succeeds on existing user and has no favs', done => {

        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123',
        })
            .then(user => Post.create({
                author: 'rfederer',
                image: 'https://example.com/image.gif',
                caption: 'backanders'
            }))
            .then(post => {
                toggleFavPost(user.username, post.id, error => {
                    if (error) return done(error)

                    User.findOne({ username: 'rfederer' })
                        .then(user => {
                            expect(user.favs).to.not.include(post.id)
                            done()
                        })
                        .catch(error => done(error))
                })
            })
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
            .then(user => Post.create({
                author: 'rfederer',
                image: 'https://example.com/image.gif',
                caption: 'backanders'
            }))
            .then(post => {
                toggleFavPost(user.username, post.id, error => {
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


    it('fails on existing user but non-existing post', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => {
                toggleFavPost('rfederer', new ObjectId().toString(), error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('post not found')
                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-function callback', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => {
                return Post.create({
                    author: 'rfederer',
                    image: 'https://example.com/image.gif',
                    caption: 'backanders'
                })
            })
            .then(createdPost => {
                post = createdPost
                let error
                try {
                    toggleFavPost('rfederer', post.id.toString(), 23)
                } catch (_error) {
                    error = _error
                } finally {
                    expect(error).to.be.instanceOf(TypeError)
                    expect(error.message).to.equal('callback is not a function')
                    done()
                }
            })
            .catch(error => done(error))
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