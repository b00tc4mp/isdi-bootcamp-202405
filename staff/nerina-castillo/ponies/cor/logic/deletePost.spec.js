import 'dotenv/config';
import deletePost from "./deletePost.js";
import mongoose, { Types } from 'mongoose';

const { ObjectId } = Types;

import { expect } from 'chai';
import { User, Post } from '../data/models.js';

import { errors } from '../../com/index.js'

const { NotFoundError, OwnershipError, ValidationError } = errors

describe('deletePost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI));

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

    it('succeeds on delete post', () => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
                    .then(post1 => {
                        Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
                            .then(post2 => {
                                deletePost(user.username, post1.id)
                                    .then(() => Post.find({}).lean())
                                    .then(posts => {
                                        expect(posts[0].author).to.equal(post2.author)
                                    })
                            })
                    })
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
            .then(post => deletePost('gonzalo', post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })


    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => deletePost('gonzalo', new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })

    })

    it('succeeds on delete post', () => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
                    .then(post => {
                        deletePost(user.username, post.id)
                            .then(() => Post.find({}).lean())
                            .then(posts => {
                                expect(posts[0].author).to.equal(post.author)
                            })
                    })
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            deletePost(123, new ObjectId().toString())
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
            deletePost('gon', new ObjectId().toString())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string post id', () => {
        let error

        try {
            deletePost('gonzalo', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

    after(() => mongoose.disconnect());
});