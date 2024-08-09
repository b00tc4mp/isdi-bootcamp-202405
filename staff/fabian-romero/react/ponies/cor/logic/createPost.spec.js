import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import createPost from './createPost.js'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError } = errors

describe('createPost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Post.deleteMany()])
    )

    it('succeeds on create new post', () => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                createPost(user.id, 'https://media.tenor.com/decnncYu_h8AAAAM/angmerino-shannis.gif', 'cabritaloca')
                    .then(user => User.findById(user.id))
                    .then(post => {
                        expect(post.author.toString()).to.equal(user.id)
                        expect(post.image).to.equal('https://media.tenor.com/decnncYu_h8AAAAM/angmerino-shannis.gif')
                        expect(post.caption).to.equal('cabritaloca')
                    })
            )

    })


    it('fails on non-existing user', () => {
        let _error

        return createPost(user.id, 'https://media.tenor.com/decnncYu_h8AAAAM/angmerino-shannis.gif', 'cabritaloca')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })


    it('fails on non-string userId', () => {
        let error

        try {
            createPost(123, 'https://media.tenor.com/decnncYu_h8AAAAM/angmerino-shannis.gif', 'Hetequierollo')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on invalid image', () => {
        let error

        try {
            createPost(new ObjectId().toString(), ' ', 'monolocopostit!')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid image')
        }
    })

    it('fails on non-string image', () => {
        let error

        try {
            createPost(new ObjectId().toString(), 123, 'monolocopostit!')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            createPost(new ObjectId().toString(), 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('caption is not a string')
        }
    })


    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
