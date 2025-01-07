import { User, Event } from '../data/models.js'
import mongoose, { Types } from 'mongoose'
import { getTime } from 'date-fns'
import { expect } from 'chai'
import { errors } from 'com'

import getAllMapEvents from './getAllMapEvents.js'

const { NotFoundError, SystemError, ValidationError } = errors
const { ObjectId } = Types

describe('getAllMapEvents', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    let user, event1, event2

    beforeEach(() => {
        return User.deleteMany()
            .then(() => Event.deleteMany())
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
                user = _user._id.toString()

                return Event.create({
                    author: user,
                    title: 'Event 1',
                    image: 'image1.png',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: getTime().toString()
                })
            })
            .then(_event1 => {
                event1 = _event1

                return Event.create({
                    author: user,
                    title: 'Event 2',
                    image: 'image2.png',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: getTime().toString()
                })
            })
            .then(_event2 => {
                event2 = _event2
            })
            .catch(error => {
                console.error('Error in beforeEach:', error)
            })
    })

    it('succeeds on getting all events', () => {
        return getAllMapEvents(user)
            .then(events => {
                expect(events).to.have.lengthOf(2)
                expect(event1).to.have.property('title', 'Event 1')
                expect(event2).to.have.property('title', 'Event 2')
                expect(event1).to.have.property('location')
                expect(event1.location).to.have.property('coordinates').that.is.an('array').that.has.lengthOf(2)
                expect(event2).to.have.property('location')
                expect(event2.location).to.have.property('coordinates').that.is.an('array').that.has.lengthOf(2)
            })
    })

    it('succeeds on attaching author details to events', () => {
        return getAllMapEvents(user)
            .then(events => {
                expect(events[0].author).to.have.property('username', 'johndoe')
                expect(events[1].author).to.have.property('username', 'johndoe')
                expect(events[0].author).to.have.property('avatar', '/avatar/avatarIcon.png')
            })
    })

    it('fails on user not found', () => {
        return getAllMapEvents(new ObjectId().toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on no events found', () => {
        let error

        return Event.deleteMany()
            .then(() => getAllMapEvents(user))
            .catch(_error => {
                error = _error
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('not found events')
            })
    })

    it('fails on event with non-existing author', () => {
        let _error

        return User.create({
            name: 'John',
            surname: 'Doe',
            role: 'user',
            email: 'john@does.com',
            username: 'johndoes',
            password: '123123123',
            avatar: '/avatar/avatarIcon.png',
            going: [],
            fav: []
        })
            .then(user => {
                return Event.create({
                    author: new ObjectId().toString(),
                    title: 'Barrenfields',
                    image: 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [40.7128, -74.0060]
                    },
                    time: getTime()
                })
                    .then(() => getAllMapEvents(user.id))
                    .catch(error => {
                        _error = error
                    })
                    .finally(() => {
                        expect(_error).to.be.instanceOf(NotFoundError)
                        expect(_error.message).to.equal('author not found')
                    })
            })
    })

    it('fails on author not found', () => {
        return Event.deleteMany()
            .then(() => {
                return Event.create({
                    author: new ObjectId().toString(),
                    title: 'Event 3',
                    image: 'image3.png',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: getTime().toString()
                })
            })
            .then(() => getAllMapEvents(user))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('author not found')
            })
    })

    it('fails on invalid user', () => {
        return getAllMapEvents('invalid userId')
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal(error.message)
            })
    })

    afterEach(() => {
        return User.deleteMany()
            .then(() => Event.deleteMany())
            .catch(error => {
                console.error('error in afterEach:', error)
            })
    })

    after(() => mongoose.disconnect())
})