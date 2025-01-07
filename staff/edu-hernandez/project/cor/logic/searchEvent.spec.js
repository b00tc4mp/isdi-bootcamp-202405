import 'dotenv/config'
import { User, Event } from '../data/models.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { errors } from 'com'
import searchEvent from './searchEvent.js'

const { NotFoundError, SystemError } = errors

const { ObjectId } = Types

describe('searchEvent', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Event.deleteMany()])
    )

    it('succeeds on existing user and query returns events', () => {
        let userId, event1, event2

        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123',
            favs: [],
            following: []
        })
            .then(user => {
                userId = user.id
                return Promise.all([
                    Event.create({
                        author: user.id,
                        title: 'Event 1',
                        image: 'https://randomImage.png',
                        caption: 'Interesting event',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.38879, 2.15899]
                        },
                        time: '08:00',
                        going: [],
                        likes: []
                    }),
                    Event.create({
                        author: user.id,
                        title: 'Event 2',
                        image: 'https://randomImage.png',
                        caption: 'Another interesting event',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.38879, 2.15899]
                        },
                        time: '09:00',
                        going: [],
                        likes: []
                    })
                ])
            })
            .then(([createdEvent1, createdEvent2]) => {
                event1 = createdEvent1
                event2 = createdEvent2

                return searchEvent(userId, 'interesting')
            })
            .then(events => {
                expect(events).to.have.lengthOf(2)

                const eventIds = [event1._id.toString(), event2._id.toString()]
                events.forEach(event => {
                    expect(event.id).to.be.oneOf(eventIds)
                    expect(event.fav).to.be.false
                    expect(event.going).to.be.false
                    expect(event.author).to.be.an('object')
                    expect(event.author.id).to.equal(userId.toString())
                })
            })
    })

    it('succeeds if there`s is not events match the query', () => {
        let userId

        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123',
            favs: [],
            following: []
        })
            .then(user => {
                userId = user.id
                return searchEvent(userId, 'nonexistent')
            })
            .then(events => {
                expect(events).to.be.an('array').that.is.empty
            })
    })

    it('fails on non-existing user', () => {
        let _error

        const nonExistingUserId = new ObjectId().toString()

        return searchEvent(nonExistingUserId, 'interesting')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing event author', () => {
        let _error
        let userId, eventId

        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123',
            favs: [],
            following: []
        })
            .then(user => {
                userId = user.id
                return Event.create({
                    author: new ObjectId(),
                    title: 'Event',
                    image: 'https://randomImage.png',
                    caption: 'Event caption',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.38879, 2.15899]
                    },
                    time: '08:00',
                    going: [],
                    likes: []
                })
            })
            .then(event => {
                eventId = event.id
                return searchEvent(userId, 'caption')
            })
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('author not found')
            })
    })

    it('fails on invalid userId format', () => {
        let _error
        const invalidUserId = new ObjectId().toString()

        return searchEvent(invalidUserId, 'event')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})