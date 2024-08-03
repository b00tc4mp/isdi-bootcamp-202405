import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from 'com/index.js'

const { ValidationError } = errors

describe('deletePost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Post.deleteMany()])
    )

    it('succeeds on delete post', () =>
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(() =>
                Post.create({ author: 'samuspine', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'morning' })
                    .then(post =>
                        deletePost('samuspine', post.id)
                            .then(post => Post.findById(post.id))
                            .then(post => expect(post).to.be.null)

                    )
            )
    )

    it('fails on invalid username', () => {
        let error

        try {
            deletePost('', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
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
            deletePost('samuspine', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    after(() => mongoose.disconnect())

})




