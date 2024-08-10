import 'dotenv/config'
import getAllPoniesPost from './getAllPoniesPosts.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('getAllPoniesPost', () => {

    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Post.deleteMany()])
    )

    it('succeeds on existing user', () =>
        User.create({ name: 'Samu', surname: 'Spine∫', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(user =>
                Post.create({ author: 'samuspine', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'morning' })
                    .then(() => getAllPoniesPost('samuspine')
                        .then(posts => {
                            return User.findOne({ username: 'samuspine' })
                                .then(() => expect(posts).to.be.an('array'))
                        })
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return getAllPoniesPost('lilideponte')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })


    it('fails on non-string username', () => {
        let error

        try {
            getAllPoniesPost(123)
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
            getAllPoniesPost('')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })


    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})

