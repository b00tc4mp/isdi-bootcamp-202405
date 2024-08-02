import 'dotenv/config'
import createPost from './createPost.js'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('createPost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeds on new post created', () => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(user => {
                createPost(user.username, 'https://content.nationalgeographic.com.es/medio/2022/12/12/ardilla-2_d0a43045_221212154055_310x310.jpg', 'ardilla')
                    .then(() => Post.findOne({ author: user.username }))
                    .then(post => {
                        expect(post.author).to.equal('tatig')
                        expect(post.image).to.equal('https://content.nationalgeographic.com.es/medio/2022/12/12/ardilla-2_d0a43045_221212154055_310x310.jpg')
                        expect(post.caption).to.equal('ardilla')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return createPost('abtg', 'https://content.nationalgeographic.com.es/medio/2022/12/12/ardilla-2_d0a43045_221212154055_310x310.jpg', 'ardilla')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            createPost(123, 'https://content.nationalgeographic.com.es/medio/2022/12/12/ardilla-2_d0a43045_221212154055_310x310.jpg', 'ardilla')
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
            createPost('', 'https://content.nationalgeographic.com.es/medio/2022/12/12/ardilla-2_d0a43045_221212154055_310x310.jpg', 'ardilla')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on invalid image', () => {
        let error

        try {
            createPost('tatig', '', 'ardilla')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid image')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())



})