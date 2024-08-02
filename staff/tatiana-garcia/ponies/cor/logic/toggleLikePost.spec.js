import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'

const { NotFoundError } = errors

describe('toggleLikePost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succesds on existing user and post has no likes', () =>
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(user =>
                Post.create({ author: user.username, image: 'https://www.portalveterinaria.com/upload/20200204085416hedgehog-child-1759027_1920.jpg', caption: 'erizo' })
                    .then(post =>
                        toggleLikePost(user.username, post.id)
                            .then(() => Post.findById(post.id).lean())
                            .then(post => expect(post.likes).to.include(user.username))
                    )
            )
    )

    it('succes on existing user and post has likes', () =>
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(user =>
                Post.create({ author: user.username, image: 'https://www.portalveterinaria.com/upload/20200204085416hedgehog-child-1759027_1920.jpg', caption: 'erizo', likes: [user.username] })
                    .then(post =>
                        toggleLikePost(user.username, post.id)
                            .then(() => Post.findById(post.id).lean())
                            .then(post => expect(post.likes).to.not.include(user.username))

                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return Post.create({ author: 'tatig', image: 'https://www.portalveterinaria.com/upload/20200204085416hedgehog-child-1759027_1920.jpg', caption: 'erizo' })
            .then(post => toggleLikePost('tatig', post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => toggleLikePost('tatig', new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})