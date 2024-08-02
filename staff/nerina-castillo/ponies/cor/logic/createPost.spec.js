import 'dotenv/config';
import createPost from "./createPost.js";
import mongoose from 'mongoose';

import { expect } from 'chai';
import { User, Post } from '../data/models.js';

const { NotFoundError, ValidationError } = errors

import { errors } from '../../com/index.js'

describe('createPost', () => {

    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on create post', () => {
        return User.create({ name: 'Gonzalo', surname: 'Zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'hashedpassword' })
            .then(() => createPost('gonzalo', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'i am fine'))
            .then(() => Post.findOne({ author: 'gonzalo' }))
            .then(post => {
                expect(post).to.not.be.null;
                expect(post.image).to.equal('https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g');
                expect(post.caption).to.equal('i am fine');
            });
    });

    it('fails on non-existing user', () => {
        let _error

        createPost('gonzalo', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'i am fine')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')

            })
    })


    it('fails on non-string image', () => {
        let error

        try {
            createPost('gonzalo', 123, 'i am fine', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on invalid image', () => {
        let error

        try {
            createPost('gonzalo', '', 'i am fine', error => { })

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid image')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            createPost('gonzalo', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('caption is not a string')
        }
    })

    afterEach(done => {
        User.deleteMany()
            .then(() => Post.deleteMany())
            .then(() => done())
            .catch(error => done(error));
    });

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error));
    });
});