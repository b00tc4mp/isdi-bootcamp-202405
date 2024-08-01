import 'dotenv/config'
import editPost from './editPost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, OwnershipError, ValidationError } = errors

describe('editPost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user and caption changed', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => Post.create({ author: user.id, img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' }))
            .then(post => {
                return editPost('monoloco', post.id, 'it works')
                    .then(() => Post.findById(post.id))
                    .then(post => {
                        expect(post.caption).to.not.equal('wtf w testing')
                        expect(post.caption).to.equal('it works')
                    })
            })
    })

    it('succeeds on existing user and caption is the same', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => Post.create({ author: user.id, img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' }))
            .then(post => {
                return editPost('monoloco', post.id, 'wtf w testing')
                    .then(() => Post.findById(post.id))
                    .then(post => expect(post.caption).to.equal('wtf w testing'))
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return Post.create({ author: new ObjectId(), img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
            .then(post => editPost('monoloco', post.id, 'it works'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing post', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => editPost('monoloco', new ObjectId().toString(), 'it works'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    it('fails on user being different from author', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123' }))
            .then(_user => Post.create({ author: _user.id, img: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' }))
            .then(post => editPost('monoloco', post.id, 'it works'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(OwnershipError)
                expect(_error.message).to.equal('post is not from user')
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            editPost(123, 'ieufgwcerugcgwuwugn', 'it works')
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
            editPost('', 'ieufgwcerugcgwuwugn', 'it works')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string id', () => {
        let error

        try {
            editPost('monoloco', 123, 'it works')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('id is not a string')
        }
    })

    it('fails on invalid id', () => {
        let error

        try {
            editPost('monoloco', '', 'it works')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid id')
        }
    })

    it('fails on non-string newCaption', () => {
        let error

        try {
            editPost('monoloco', 'ieufgwcerugcgwuwugn', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('newCaption is not a string')
        }
    })

    it('fails on invalid newCaption', () => {
        let error

        try {
            editPost('monoloco', 'ieufgwcerugcgwuwugn', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid newCaption')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})