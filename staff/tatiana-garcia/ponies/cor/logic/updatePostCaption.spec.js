import 'dotenv/config'
import updatePostCaption from "./updatePostCaption.js"
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError } = errors

describe('updatePostCaption', () => {
    before(() => { mongoose.connect(process.env.MONGODB_URI) })

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user and post', () => {
        User.create({ name: 'Alberto', surname: 'Garcia', email: 'abt@garcia.com', username: 'abtg', password: '123123123' })
            .then(() => {
                Post.create({ author: 'abtg', image: 'https://www.grupoxcaret.com/es/wp-content/uploads/2021/03/aves-boris.jpg', caption: 'pajaro azul' })
                    .then(post => updatePostCaption('abtg', post.id, 'pajaro azul'))

                Post.findById(post.id).lean()
                    .then(post => {
                        expect(post.caption).to.equal('pajaro azul')
                    })
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            updatePostCaption(123, new ObjectId().toString(), 'koala')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })



    it('fails on non-string username', () => {
        let error

        try {
            updatePostCaption(123, new ObjectId().toString(), 'weeee')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            updatePostCaption('', new ObjectId().toString(), 'weeee')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            updatePostCaption('abtg', new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('caption is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})