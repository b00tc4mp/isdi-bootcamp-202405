import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import updatePostCaption from './updatePostCaption.js'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('updatePostCaption', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Post.deleteMany())

    it('succeeds on existing user and post', () =>
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(() =>
                Post.create({ author: 'samuspine', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'morning' })
                    .then(post =>
                        updatePostCaption('samuspine', post.id, 'nigth')
                            .then(() => Post.findById(post.id).lean())
                            .then(post => expect(post.caption).to.equal('nigth'))
                    )

            )
    )

    it('fails on non-existing user', () => {
        let _error

        return Post.create({ author: 'samuspine', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'morning' })
            .then(post => updatePostCaption('samuspine', post.id, 'nigth'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(() => updatePostCaption('samuspine', new ObjectId().toString(), 'morning'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })


    it('fails on non-string username', () => {
        let error

        try {
            updatePostCaption(123, new ObjectId().toString(), 'morning')
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
            updatePostCaption('', 'hdkshsj55868', 'morning')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string postId', () => {
        let error
        try {
            updatePostCaption('samuspine', 123, 'morning')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    // it('fails on invalid postId', () => {
    //     let error

    //     try {
    //         updatePostCaption('samuspine', '', 'morning', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(SyntaxError)
    //         expect(error.message).to.equal('invalid postId')
    //     }
    // })

    it('fails on non-string caption', () => {
        let error

        try {
            updatePostCaption('samuspine', 'sfhbjfsbs7585', 123)
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


