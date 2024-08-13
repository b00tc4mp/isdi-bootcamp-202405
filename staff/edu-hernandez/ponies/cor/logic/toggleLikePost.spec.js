import 'dotenv/config.js'
import toggleLikePost from './toggleLikePost.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import { errors } from 'com'

const { NotFoundError } = errors
const { ObjectId } = Types

describe('toggleLikePost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Post.deleteMany()])
    )

    it('succeeds on existing user and post has no likes', () =>
        User.create({
            name: 'Mono',
            surname: 'Loco',
            email: 'mono@loco.com',
            username: 'monoloco',
            password: '123123123'
        })
            .then(user =>
                Post.create({
                    author: user.username,
                    image: 'https://example.com/image.gif',
                    caption: 'backhadners',
                    likes: [user.username]
                })
                    .then(post =>
                        toggleLikePost(user.username, post.id)
                            .then(() => Post.findById(post.id).lean())
                            .then(post => expect(post.likes).to.include(user.username))
                    )
            )
    )

    it('succeeds on existing user and post has likes', () =>
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(user => Post.create({
                author: user.username,
                image: 'https://example.com/image.gif',
                caption: 'backanders',
                likes: ['rfederer']
            })
                .then(post =>
                    toggleLikePost(user.username, post.id)
                        .then(() => Post.findById(post.id).lean())
                        .then(post => expect(post.likes).to.not.include(user.username))
                )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return Post.create({
            author: 'rfederer',
            image: 'https://example.com/image.gif',
            caption: 'backanders'
        })
            .then(post => toggleLikePost('rfederer', post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => toggleLikePost('rfederer', new ObjectId().toString()))
            .catch(error => done(error))
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('post not found')
            })
    })


    // it('User tries to like his/her own post', done => {
    //     User.create({
    //         name: 'Roger',
    //         surname: 'Federer',
    //         email: 'roger@federer.com',
    //         username: 'rfederer',
    //         password: '123123123'
    //     })
    //         .then(() => Post.create({
    //             author: 'rfederer',
    //             image: 'https://example.com/image.gif',
    //             caption: 'backanders'
    //         }))
    //         .then(post => {
    //             toggleLikePost('rfederer', post.id, error => {
    //                 expect(error).to.be.instanceOf(NotFoundError)
    //                 expect(error.message).to.not.equal('Cannot like your own post')
    //                 done()
    //             })
    //         })
    //         .catch(error => done(error))
    // })

    // it('user like a post they have already liked', done => {
    //     User.create({
    //         name: 'Roger',
    //         surname: 'Federer',
    //         email: 'roger@federer.com',
    //         username: 'rfederer',
    //         password: '123123123'
    //     })
    //         .then(() => Post.create({
    //             author: 'someuser',
    //             image: 'https://example.com/image.gif',
    //             caption: 'another post',
    //             likes: ['rfederer']
    //         }))
    //         .then(post => {
    //             toggleLikePost('rfederer', post.id, error => {
    //                 expect(error).to.be.instanceOf(NotFoundError)
    //                 expect(error.message).to.not.equal('You have already liked this post')
    //                 done()
    //             })
    //         })
    //         .catch(error => done(error))
    // })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})