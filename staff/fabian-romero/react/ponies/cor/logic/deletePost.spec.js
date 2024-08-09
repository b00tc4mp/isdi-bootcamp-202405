import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('deletePost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Post.deleteMany()])
    )

    it('succeeds on new delete post', () => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.tenor.com/DHgp-RbUFL0AAAAM/rosalia-beso.gif', caption: 'cabritaloca' })
                    .then(post =>
                        deletePost(user.id, post.id)
                            .then(user => User.findById(user.id))
                            .then(post => Post.findById(post.id).lean())
                            .then(() =>
                                expect(post.author.toString()).to.equal(user.id))
                    )
            )
    })


    it('fails on non-existing user', () => {
        Post.create({ author: user.id, image: 'https://media.tenor.com/DHgp-RbUFL0AAAAM/rosalia-beso.gif', caption: 'wtf w testing' })
            .then(post => deletePost(user.id, post.id))
        expect(error).to.be.instanceOf(NotFoundError)
        expect(error.message).to.equal('user not found')

    })


    it('fails on existing user but non-existing post', () => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => deletePost(user.id, new ObjectId().toString()))
            .then(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Post not found')
            })
    })


    it('fails on non-string userId', () => {
        let error

        try {
            deletePost(123, new ObjectId().toString())

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on invalid userId', () => {
        let error

        try {
            deletePost(' ', new ObjectId().toString())

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string postId', () => {
        let error

        try {
            deletePost(new ObjectId().toString(), 123)

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