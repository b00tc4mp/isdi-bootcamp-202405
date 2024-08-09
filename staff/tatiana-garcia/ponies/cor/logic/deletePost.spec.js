import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError, OwnershipError } = errors

describe('deletePost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeds on delete post', () => {
        return User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => Post.create({ author: 'tatig', image: 'https://www.grupoxcaret.com/es/wp-content/uploads/2021/03/aves-boris.jpg', caption: 'huroncito' }))
            .then(post => {
                return deletePost('tatig', post.id)
                    .then(() => User.findOne({ username: 'tatig' }))
                    .then(user =>
                        Post.findById(post.id)
                            .then(_post => {
                                expect(_post).to.be.null
                            })
                    )
            })
    })

    it('fails on invalid username', () => {
        let error

        try {
            deletePost('hg', post.id) //aqui tiene que estar el id pero si lo pongo no me funciona
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => deletePost('tatig', new ObjectId().toString()))
            .then(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    it('fails on existing user and post but post does not belog to user', () => {
        let _error

        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(user => {
                Post.create({ author: 'tatig', image: 'https://www.grupoxcaret.com/es/wp-content/uploads/2021/03/aves-boris.jpg', caption: 'huroncito' })
                    .then(post => deletePost(user.username, post.id))
                    .then(() => {
                        expect(_error).to.be.instanceOf(OwnershipError)
                        expect(_error.message).to.equal('Post does not belong to user')
                    })
            })
    })


    it('fails on invalid postId', () => {
        let error

        try {
            deletePost('tatig', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid postId') // me da error porque dice que espera invalid value ¿?
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})