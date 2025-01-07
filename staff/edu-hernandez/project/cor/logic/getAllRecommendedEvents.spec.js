import 'dotenv/config.js'
import { User, Event } from '../data/models.js'
import { expect } from 'chai'
import { errors } from 'com'
import mongoose, { Types } from 'mongoose'

import getAllRecommendedEvents from './getAllRecommendedEvents.js'

const { ObjectId } = Types
const { ValidationError, NotFoundError } = errors

describe('getAllRecommendedEvents', () => {
    before(() => { return mongoose.connect(process.env.MONGODB_URI) })

    beforeEach(() => { return User.deleteMany().then(() => Event.deleteMany()) })

    it('succeeds on getting recommended events', () => {
        return Promise.all([
            User.create({
                name: 'Pedro',
                surname: 'Park',
                role: 'user',
                email: 'bruno@diaz.com',
                username: 'pedropark',
                password: '123123123',
                fav: []
            }),
            User.create({
                name: 'Mary',
                surname: 'Jane',
                role: 'user',
                email: 'mary@jane.com',
                username: 'maryjane',
                password: '123123123',
                fav: []
            })
        ])
            .then(([pedro, mary]) => {
                return Event.create({
                    author: mary._id.toString(),
                    title: 'Event 1',
                    image: 'https://randomImage.png',
                    caption: 'Caption event 1',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: '18:00'
                })
                    .then(event => {
                        return { event, pedro, mary }
                    })
            })
            .then(({ event, pedro, mary }) => {
                return User.updateOne({ _id: mary._id }, { $push: { fav: event._id } })
                    .then(() => {
                        return getAllRecommendedEvents(pedro._id.toString())
                            .then(popularEvents => {
                                expect(popularEvents).to.be.an('array')
                                expect(popularEvents.length).to.equal(1)
                            })
                    })
            })
    })

    it('succeeds on recommended events not found', () => {
        return User.create({
            name: 'Peter',
            surname: 'Parker',
            role: 'user',
            email: 'peter@parker.com',
            username: 'peterparker',
            password: 'spiderman123',
            fav: []
        })
            .then(peter => getAllRecommendedEvents(peter._id.toString()))
            .then(recommendedEvents => {
                expect(recommendedEvents).to.be.an('array')
                expect(recommendedEvents.length).to.equal(0)
            })
    })

    it('fails on author not found', () => {
        debugger
        let _error

        return Promise.all([
            User.create({
                name: 'Pedro',
                surname: 'Park',
                role: 'user',
                email: 'peter@parker.com',
                username: 'pedropark',
                password: '123123123',
                fav: []
            }),
            User.create({
                name: 'Mary',
                surname: 'Jane',
                role: 'user',
                email: 'mary@jane.com',
                username: 'maryjane',
                password: '123123123',
                fav: []
            })
        ])
            .then(([pedro, mary]) => {
                return Promise.all([
                    Event.create({
                        author: mary._id.toString(),
                        title: 'Event 1',
                        image: 'https://randomImage.png',
                        caption: 'This is event 1',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00'
                    }),
                    Event.create({
                        author: new ObjectId().toString(),
                        title: 'Event 2',
                        image: 'https://randomImage.png',
                        caption: 'This is event 2',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00'
                    })
                ])
                    .then(([event1, event2]) => {
                        return User.updateOne({ _id: mary._id }, { $push: { fav: { $each: [event1._id, event2._id] } } })
                    })
                    .then(() => {
                        return getAllRecommendedEvents(pedro._id.toString())
                            .catch(error => _error = error)
                            .finally(() => {
                                expect(_error).to.be.instanceOf(NotFoundError)
                                expect(_error.message).to.equal('author not found')
                            })
                    })
            })
    })

    it('fails on users not found', () => {
        return getAllRecommendedEvents(new ObjectId().toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('users not found')
            })
    })

    it('fails on invalid userId', () => {
        let error

        try {
            getAllRecommendedEvents(new ObjectId())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllRecommendedEvents(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    afterEach(() => {
        return Event.deleteMany()
            .then(() => User.deleteMany())
    })

    after(() => {
        return mongoose.disconnect()
    })
})