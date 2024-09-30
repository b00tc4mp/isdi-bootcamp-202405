import 'dotenv/config'
import getAllLikeEvents from './getAllLikeEvents.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Event } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('getAllLikeEvent', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Event.deleteMany()]))

    it('succeeds on existing user', () => {
        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(user => {
                return Event.create({ author: user.id, title: 'TRT', organizer: 'Sergio Canovas', date: new Date(2024 / 9 / 17), duration: '3 dias', description: 'un evento sobre ....', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, address: "calle diputacion 37", city: "Barcelona" })
                    .then(event => {
                        return User.findByIdAndUpdate(user.id, { $push: { likes: event.id } })
                            .then(() => getAllLikeEvents(user.id))
                            .then(events => {
                                expect(events[0].id).to.equal(event.id)
                            })
                    })
            })
    })

    it('succeeds on user with no liked events', () => {
        return User.create({
            name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789', likes: []
        })
            .then(user =>
                getAllLikeEvents(user._id.toString())
                    .then(events => {
                        expect(events).to.be.an('array').that.is.empty
                    })
            )
    })

    it('fails on author not found', () => {
        let _error

        return Event.create({ author: new ObjectId().toString(), title: 'TRT', organizer: 'Sergio Canovas', date: new Date(2024 / 9 / 17), duration: '3 dias', description: 'un evento sobre ....', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, address: "calle diputacion 37", city: "Barcelona" })
            .then(event =>
                User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789', likes: [event.id] })
                    .then(event => User.findOne(event.author))
                    .then(user => getAllLikeEvents(user.id)
                        .catch(error => _error = error)
                        .finally(() => {
                            expect(_error).to.be.instanceOf(NotFoundError)
                            expect(_error.message).to.equal('author not found')
                        })
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getAllLikeEvents(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')

            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllLikeEvents(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
