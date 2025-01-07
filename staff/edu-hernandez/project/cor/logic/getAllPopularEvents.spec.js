import 'dotenv/config.js'
import { User, Event } from '../data/models.js'
import { expect } from 'chai'
import { errors } from 'com'
import mongoose, { Types } from 'mongoose'
import getAllPopularEvents from './getAllPopularEvents.js'

const { ObjectId } = Types
const { ValidationError, NotFoundError } = errors

describe('getAllPopularEvents', () => {
    before(() => { return mongoose.connect(process.env.MONGODB_URI) })

    beforeEach(() => { return User.deleteMany().then(() => Event.deleteMany()) })

    it('succeeds on finding popular events', () => {
        return Promise.all([
            User.create({
                name: 'Pedro',
                surname: 'Park',
                role: 'user',
                email: 'bruno@diaz.com',
                username: 'pedropark',
                password: '123123123',
                going: []
            }),
            User.create({
                name: 'Mary',
                surname: 'Jane',
                role: 'user',
                email: 'mary@jane.com',
                username: 'maryjane',
                password: '123123123',
                going: []
            })
        ])
            .then(([pedro, mary]) => {
                return Promise.all([
                    Event.create({
                        author: pedro._id.toString(),
                        title: 'Event 1',
                        image: 'https://randomImage.png',
                        caption: 'Caption event 1',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00',
                        going: []
                    }),
                    Event.create({
                        author: pedro._id.toString(),
                        title: 'Event 2',
                        image: 'https://randomImage.png',
                        caption: 'Caption event 2',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00',
                        going: []
                    })
                ])
                    .then(([event1, event2]) => {
                        return User.updateOne({ _id: pedro._id }, { $push: { going: { $each: [event1._id, event2._id] } } })
                            .then(() => ({ event1, event2 }))
                    })
                    .then(() => {
                        return getAllPopularEvents(mary._id.toString())
                            .then(popularEvents => {
                                expect(popularEvents).to.be.an('array')
                                expect(popularEvents).to.have.lengthOf(2)
                                expect(popularEvents[0].title).to.equal('Event 1')
                                expect(popularEvents[1].title).to.equal('Event 2')
                            })
                    })
            })
    })

    it('succeeds on getting popular events', () => {
        return Promise.all([
            User.create({
                name: 'Pedro',
                surname: 'Park',
                role: 'user',
                email: 'pedro@parker.com',
                username: 'pedroparker',
                password: '123123123',
                going: []
            }),
            User.create({
                name: 'Mary',
                surname: 'Jane',
                role: 'user',
                email: 'mary@jane.com',
                username: 'lamary',
                password: '123123123',
                going: []
            })
        ])
            .then(([pedro, lamary]) => {
                return Promise.all([
                    Event.create({
                        author: lamary._id.toString(),
                        title: 'Event 1',
                        image: 'https://randomImage.png',
                        caption: 'Caption for John event 1',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00',
                        going: []
                    }),
                    Event.create({
                        author: pedro._id.toString(),
                        title: 'Event 2',
                        image: 'https://randomImage.png',
                        caption: 'Caption for Jane event 1',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00',
                        going: []
                    })
                ])
                    .then((events) => {
                        return User.updateOne({ _id: pedro._id }, { $push: { going: events[1]._id } })
                            .then(() => {
                                return getAllPopularEvents(lamary._id.toString())
                                    .then(popularEvents => {
                                        expect(popularEvents).to.be.an('array')
                                        expect(popularEvents.length).to.equal(1)
                                        expect(popularEvents[0].title).to.equal('Event 2')
                                    })
                            })
                    })
            })
    })

    it('succeeds on popular events not found', () => {
        return User.create({
            name: 'Peter',
            surname: 'Parker',
            role: 'user',
            email: 'peter@parker.com',
            username: 'peterparker',
            password: 'spiderman123',
            fav: []
        })
            .then(peter => getAllPopularEvents(peter._id.toString()))
            .then(recommendedEvents => {
                expect(recommendedEvents).to.be.an('array')
                expect(recommendedEvents.length).to.equal(0)
            })
    })

    it('succeeds with no going events', () => {
        return Promise.all([
            User.create({
                name: 'Pedro',
                surname: 'Park',
                role: 'user',
                email: 'pedro@diaz.com',
                username: 'pedropark',
                password: '123123123',
                going: []
            }),
            User.create({
                name: 'Mary',
                surname: 'Jane',
                role: 'user',
                email: 'mary@jane.com',
                username: 'maryjane',
                password: '123123123',
                going: []
            })
        ])
            .then(([pedro, mary]) => {
                return getAllPopularEvents(mary._id.toString())
                    .then(popularEvents => {
                        expect(popularEvents).to.be.an('array').that.is.empty
                    })
            })
    })

    it('succeeds when users have going events but no events found', () => {
        return User.create({
            name: 'Pedro',
            surname: 'Park',
            role: 'user',
            email: 'pedro@diaz.com',
            username: 'pedropark',
            password: '123123123',
            going: []
        })
            .then(pedro => {
                return User.updateOne({ _id: pedro._id }, { $push: { going: new ObjectId() } })
                    .then(() => {
                        return getAllPopularEvents(pedro._id.toString())
                            .then(popularEvents => {
                                expect(popularEvents).to.be.an('array').that.is.empty
                            })
                    })
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
                going: []
            }),
            User.create({
                name: 'Mary',
                surname: 'Jane',
                role: 'user',
                email: 'mary@jane.com',
                username: 'maryjane',
                password: '123123123',
                going: []
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
                        return User.updateOne({ _id: mary._id }, { $push: { going: { $each: [event1._id, event2._id] } } })
                    })
                    .then(() => {
                        return getAllPopularEvents(pedro._id.toString())
                            .catch(error => _error = error)
                            .finally(() => {
                                expect(_error).to.be.instanceOf(NotFoundError)
                                expect(_error.message).to.equal('author not found')
                            })
                    })
            })
    })
    
    it('fails on invalid userId', () => {
        let _error

        try {
            getAllPopularEvents(new ObjectId())
        } catch (error) {
            _error = error
        } finally {
            expect(_error).to.be.instanceOf(ValidationError)
            expect(_error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string userId', () => {
        let _error

        try {
            getAllPopularEvents(123)
        } catch (error) {
            _error = error
        } finally {
            expect(_error).to.be.instanceOf(ValidationError)
            expect(_error.message).to.equal('userId is not a string')
        }
    })

    afterEach(() => { return Event.deleteMany().then(() => User.deleteMany()) })

    after(() => { return mongoose.disconnect() })
})