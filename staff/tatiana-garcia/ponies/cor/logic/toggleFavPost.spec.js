import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'
const { NotFoundError } = errors

describe('toggleFavPost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user and post has no favs', () => {
        User.create({ name: 'alberto', surname: 'garcia', email: 'abt@garcia.com', username: 'abtg', password: '123123123' })
            .then(user => {
                Post.create({ author: 'abtg', image: 'https://www.fundacionaquae.org/wp-content/uploads/2018/10/proteger-a-los-animales.jpg', caption: 'mapache' })
                    .then(post => {
                        toggleFavPost(user.username, post.id)
                            .then(User.findOne({ username: 'abtg' }))
                            .then(user => { expect(user.favs).to.include(post.id) })
                    })
            })
    })

    it('succes on existing user and post with favs', () => {
        Post.create({ author: 'abtg', image: 'https://www.fundacionaquae.org/wp-content/uploads/2018/10/proteger-a-los-animales.jpg', caption: 'mapache' })
            .then(post => {
                User.create({ name: 'alberto', surname: 'garcia', email: 'abt@garcia.com', username: 'abtg', password: '123123123', favs: [post.id] })
                    .then(() => {
                        toggleFavPost('abtg', post.id)
                            .then(() => User.findOne({ username: 'abtg' }).lean())
                            .then(user => { expect(user.favs).to.not.include(post.id) })

                    })
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return Post.create({ author: 'abtg', image: 'https://www.fundacionaquae.org/wp-content/uploads/2018/10/proteger-a-los-animales.jpg', caption: 'mapache' })
            .then(post => toggleFavPost('abtg', post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => toggleFavPost('tatig', new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('post not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})