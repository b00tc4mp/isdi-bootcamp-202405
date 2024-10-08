import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import errors from '../../com/errors.js'
import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('getAllFollowingUserPosts', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user listing all following posts', () => {
        return User.create({ name: 'author_name', username: 'author_username', role: 'user', email: 'author@domain.com', password: 'author_password', avatar: 'author_avatar_url' })
            .then(author => {
                return Post.create({ author: author._id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'hello' })
                    .then(post => {
                        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123', following: [author._id] })
                            .then(user => getAllFollowingUserPosts(user.id))
                            .then(followingPosts => {
                                expect(followingPosts).to.be.an('array').that.is.not.empty
                                const postFound = followingPosts.find(followingPost => followingPost.id === post._id.toString())
                                expect(postFound).to.be.an('object').that.includes({ id: post._id.toString(), image: post.image, text: post.text, like: false })
                                expect(postFound.author).to.be.an('object').that.includes({ id: author._id.toString(), username: 'author_username', avatar: 'author_avatar_url', following: true })
                            })
                    })
            })
    })

    it('fails on non-existing author', () => {
        const authorId = new ObjectId()
        const userId = new ObjectId()

        return User.create({ _id: userId, name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123', following: [authorId] })
            .then(() => {
                return Post.create({ author: authorId, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'hello' })
            })
            .then(() => {
                return getAllFollowingUserPosts(userId.toString())
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('author not found')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return getAllFollowingUserPosts(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllFollowingUserPosts(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('value is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})