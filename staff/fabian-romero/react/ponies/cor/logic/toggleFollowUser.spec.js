import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import { errors } from 'com'

const { ValidationError, NotFoundError } = errors

describe('toggleFollowUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user and post with no favs', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                User.create({ name: 'Cabra', surname: 'Loca', email: 'cabra@loca.com', username: 'cabraloca', password: '123123123' })
                    .then(targetUserId =>
                        toggleFollowUser(user.id, targetUserId)
                            .then(user => User.findById(user.id))
                            // .the(targetUser => User.findById(user.id))
                            .then(user => expect(user.following.map(userObjectId => userObjectId.toString())).to.include(targetUserId))
                    )
            )

    )

    it('succeeds on existing user and post has likes', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.tenor.com/DHgp-RbUFL0AAAAM/rosalia-beso.gif', caption: 'lalala', likes: [user.id] })
                    .then(post =>
                        toggleFollowUser(user.id, post.id)
                            .then(() => Post.findById(post.id).lean())
                            .then(post => expect(post.favs).to.not.include(user.id))
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        const userObjectId = new ObjectId

        return Post.create({
            author: userObjectId, image: 'https://media.tenor.com/DHgp-RbUFL0AAAAM/rosalia-beso.gif'
            , caption: 'lalala'
        })
            .then(post => toggleFollowUser(userObjectId.toString(), post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => toggleFollowUser(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            toggleFollowUser(123, targetUserId)
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
            toggleFollowUser(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    it('fails on invalid postId', () => {
        let error

        try {
            toggleFollowUser(new ObjectId().toString(), ' ')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid postId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())


})