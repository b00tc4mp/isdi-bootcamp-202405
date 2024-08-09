import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('toggleFavPost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user and post with no favs', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.tenor.com/DHgp-RbUFL0AAAAM/rosalia-beso.gif', caption: 'lalala' })
                    .then(post =>
                        toggleFavPost(user.id, post.id)
                            .then(() => User.findById(user.id).lean())
                            .then(user => expect(user.favs.map(userObjectId => userObjectId.toString())).to.include(post.id))
                    )
            )
    )

    it('succeeds on existing user and post has favs', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123', })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.tenor.com/DHgp-RbUFL0AAAAM/rosalia-beso.gif', caption: 'lalala' })
                    .then(post =>
                        toggleFavPost(user.id, post.id)
                            .then(() => User.findById(user.id).lean())
                            .then(user => expect(user.favs.map(userObjectId => userObjectId.toString())).to.not.include(post.id))
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return Post.create({
            author: user.id, image: 'https://media.tenor.com/DHgp-RbUFL0AAAAM/rosalia-beso.gif'
            , caption: 'lalala'
        })
            .then(post => toggleFavPost(user.id, post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => toggleFavPost(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            toggleFavPost(123, new ObjectId().toString())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string postId', () => {
        let error

        try {
            toggleFavPost(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())


})