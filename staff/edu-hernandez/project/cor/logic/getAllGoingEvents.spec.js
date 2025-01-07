import 'dotenv/config'
import { User, Event } from '../data/models.js'
import mongoose, { Types } from 'mongoose'
import { getTime } from 'date-fns'
import { expect } from 'chai'
import { errors } from 'com'

import getAllGoingEvents from './getAllGoingEvents.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError, SystemError } = errors

describe('getAllGoingEvents', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    let user, event1, event2

    beforeEach(() => {
        return Promise.all([User.deleteMany(), Event.deleteMany()])
            .then(() => {
                return User.create({
                    name: 'John',
                    surname: 'Doe',
                    role: 'user',
                    email: 'john@doe.com',
                    username: 'johndoe',
                    password: '123123123',
                    avatar: '/avatar/avatarIcon.png',
                    going: [],
                    fav: []
                })
            })
            .then(_user => {
                user = _user

                return Promise.all([
                    Event.create({
                        author: user._id,
                        title: 'Event 1',
                        image: 'image1.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: getTime().toString()
                    }),
                    Event.create({
                        author: user._id,
                        title: 'Event 2',
                        image: 'image2.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: getTime().toString()
                    })
                ])
            })
            .then(([e1, e2]) => {
                event1 = e1
                event2 = e2

                return User.findByIdAndUpdate(
                    user._id, { going: [event1._id, event2._id] }
                )
            })
    })

    it('fails when event author not found', () => {
        return Event.create({
            author: new ObjectId(),
            title: 'Orphan Event',
            image: 'image.png',
            date: new Date(),
            location: {
                type: 'Point',
                coordinates: [41.3874, 2.1686]
            },
            time: getTime().toString()
        })
        .then(event => {
            return User.findByIdAndUpdate(user._id, { going: [event._id] })
        })
        .then(() => {
            return getAllGoingEvents(user._id.toString())
        })
        .catch(error => {
            expect(error).to.exist
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('author not found')
        })
    })

    it('succeeds on valid user with multiple going events', () => {
        return getAllGoingEvents(user._id.toString())
            .then(events => {
                expect(events).to.have.lengthOf(2)
                expect(event1.title).to.equal('Event 1')
                expect(event2.title).to.equal('Event 2')
                expect(events[0].location.coordinates).to.deep.equal([41.3874, 2.1686])
            })
    })

    it('succeeds on user with no going events', () => {
        return User.create({
            name: 'Test',
            surname: 'User',
            role: 'user',
            email: 'test@user.com',
            username: 'testuser',
            password: '123123123',
            going: []
        })
            .then(user => getAllGoingEvents(user._id.toString()))
            .then(events => {
                expect(events).to.be.an('array').that.is.empty
            })
    })

    it('fails on author not found', () => {
        let userId

        return User.create({
            name: 'Test',
            surname: 'User',
            role: 'user',
            email: 'test@user.com',
            username: 'testuser',
            password: '123123123',
            going: []
        })
            .then(user => {
                userId = user._id

                return Event.create({
                    author: new ObjectId(),
                    title: 'Orphan Event',
                    image: 'image.png',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: '18:00'
                })
            })
            .then(event => {
                return User.findByIdAndUpdate(userId, { $push: { going: event._id } })
                    .then(() => event)
            })
            .then(() => { return getAllGoingEvents(userId.toString()) })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('author not found')
            })
    })

    it('fails when user not found', () => {
        return getAllGoingEvents(new ObjectId().toString())
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails when user has an invalid eventId in going array', () => {
        return User.create({
            name: 'Mike',
            surname: 'Roe',
            role: 'user',
            email: 'mike@roe.com',
            username: 'miker',
            password: '123123123',
            going: [new ObjectId().toString()]
        })
            .then(user => {
                return getAllGoingEvents(user._id.toString())
                    .catch(error => {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('event not found')
                    })
            })
    })

    it('fails when event associated with going is not found', () => {
        return User.findByIdAndUpdate(user._id, { going: [new ObjectId()] })
            .then(() => {
                return getAllGoingEvents(user._id.toString())
                    .catch(error => {
                        expect(error).to.exist
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('event not found')
                    })
            })
    })

    it('fails on database error', () => {
        const userId = new ObjectId().toString()

        return mongoose.disconnect()
            .then(() => {
                return getAllGoingEvents(userId)
                    .catch(error => {
                        expect(error).to.be.instanceOf(SystemError)
                        expect(error.message).to.equal('Client must be connected before running operations')
                    })
            })
            .finally(() => {
                return mongoose.connect(process.env.MONGODB_URI)
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})