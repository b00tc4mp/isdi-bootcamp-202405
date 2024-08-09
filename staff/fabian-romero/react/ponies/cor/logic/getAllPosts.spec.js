import 'dotenv/config'
import getAllPosts from './getAllPosts.js'
import mongoose, { Types } from 'mongoose'
const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('getAllPosts', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing all fav posts', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                Post.create({ author: user.id, image: 'https://media.tenor.com/DHgp-RbUFL0AAAAM/rosalia-beso.gif', caption: 'lalala' })
                    .then(post => {
                        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123', favs: [post.id] })
                            .then(user =>
                                getAllPosts(user.id))
                        User.findOne({ username: 'monoloco' })
                            .then(user => expect(user.favs).to.include(post.id))

                    })
            })
    )


    it('fails on non-existing user', () => {
        let _error

        const userObjectId = new ObjectId

        return Post.create({ author: userObjectId, image: 'https://media.tenor.com/DHgp-RbUFL0AAAAM/rosalia-beso.gif', caption: 'wtf w testing' })
            .then(post => getAllPosts(userObjectId.toString(), post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })


    it('fails on non-string userId', () => {
        let error

        try {
            getAllPosts(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })


    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})