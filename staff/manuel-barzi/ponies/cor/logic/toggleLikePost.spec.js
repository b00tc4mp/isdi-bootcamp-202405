import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError } = errors

describe('toggleLikePost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        // User.deleteMany()
        //     .then(() => Post.deleteMany())
        Promise.all([User.deleteMany(), Post.deleteMany()])
    )

    it('succeeds on existing user and post has no likes', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
                    .then(post =>
                        toggleLikePost(user.id, post.id)
                            .then(() => Post.findById(post.id).lean())
                            .then(post => expect(post.likes.map(userObjectId => userObjectId.toString())).to.include(user.id))
                    )
            )
    )

    it('succeeds on existing user and post has likes', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing', likes: [user.id] })
                    .then(post =>
                        toggleLikePost(user.id, post.id)
                            .then(() => Post.findById(post.id).lean())
                            .then(post => expect(post.likes).to.not.include(user.username))
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        const userObjectId = new ObjectId

        return Post.create({ author: userObjectId, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
            .then(post => toggleLikePost(userObjectId.toString(), post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => toggleLikePost(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    // TODO implement all other test cases

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})

