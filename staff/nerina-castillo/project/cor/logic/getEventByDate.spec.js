import 'dotenv/config'
import mongoose, { get, Types } from 'mongoose'
import { User, Event } from '../data/models.js'
import errors from '../../com/errors.js'
import getEventByDate from './getEventByDate.js'
import { expect } from 'chai'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('getEventByDate', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    it('succeeds on existing user returning events for a date', () => {
        const date = '2024-08-27T00:00:00Z'

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Event.create({
                    author: user.id,
                    image: 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif',
                    title: 'Barrenfields',
                    description: 'Barrenfields concert',
                    location: { type: 'Point', coordinates: [40.7128, -74.0060] },
                    startDate: new Date(date),
                    startTime: '21:30',
                    tickets: 'http://crocantickets.com'
                })
                    .then(() => {
                        Event.create({
                            author: user.id,
                            image: 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif',
                            title: 'Luis Aragofest',
                            description: 'Punk en las canchas',
                            location: { type: 'Point', coordinates: [40.7128, -74.0060] },
                            startDate: new Date(date),
                            startTime: '22:30',
                            tickets: 'http://crocantickets.com'
                        })
                            .then(() => {
                                getEventByDate(user.id, date)
                                    .then(events => {
                                        expect(events).to.have.lengthOf(2)
                                        expect(events[0].author.id).to.equal(user.id.toString())
                                        expect(events[1].author.id).to.equal(user.id.toString())
                                        expect(events[0].author.username).to.equal(user.username)
                                        expect(events[1].author.username).to.equal(user.username)
                                        expect(events[0].author.avatar).to.equal(user.avatar)
                                        expect(events[1].author.avatar).to.equal(user.avatar)
                                        expect(events[0].author.following).to.be.false
                                        expect(events[1].author.following).to.be.false
                                    })
                            })
                    })
            )
    })

    it('succeeds on existing user following the event author', () => {
        const date = '2024-08-27T00:00:00Z'
        let followedUser

        return User.create({ name: 'followed', username: 'followedUser', role: 'user', email: 'followed@user.com', password: 'followed123' })
            .then(_followedUser => {
                followedUser = _followedUser

                return User.create({
                    name: 'gon',
                    username: 'gonzalo',
                    role: 'user',
                    email: 'gon@zalo.com',
                    password: 'gonzalo123',
                    following: [followedUser.id]
                })
            })
            .then(user =>
                Event.create({
                    author: followedUser.id,
                    image: 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif',
                    title: 'Barrenfields',
                    description: 'Barrenfields concert',
                    location: { type: 'Point', coordinates: [40.7128, -74.0060] },
                    startDate: new Date(date),
                    startTime: '21:30',
                    tickets: 'http://crocantickets.com'
                })
                    .then(() => getEventByDate(user.id, date))
                    .then(events => {
                        expect(events).to.have.lengthOf(1)
                        expect(events[0].author.id).to.equal(followedUser.id.toString())
                        expect(events[0].author.username).to.equal(followedUser.username)
                        expect(events[0].author.avatar).to.equal(followedUser.avatar)
                        expect(events[0].author.following).to.be.true
                    })
            )
    })

    it('fails on event with non-existing author', () => {
        let _error
        const date = '2024-08-27T00:00:00Z'

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                return Event.create({
                    author: new ObjectId().toString(),
                    image: 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif',
                    title: 'Barrenfields',
                    description: 'Barrenfields concert',
                    location: { type: 'Point', coordinates: [40.7128, -74.0060] },
                    startDate: new Date(date),
                    startTime: '21:30',
                    tickets: 'http://crocantickets.com'
                })
                    .then(() => getEventByDate(user.id, date))
                    .catch(error => {
                        _error = error
                    })
                    .finally(() => {
                        expect(_error).to.be.instanceOf(NotFoundError)
                        expect(_error.message).to.equal('author not found')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let _error
        const date = '2024-08-27T00:00:00Z'

        return getEventByDate(new ObjectId().toString(), date)
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on invalid date', () => {
        let error
        const date = 'kjbñq'

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                return getEventByDate(user.id, date)
            })
            .catch(_error => {
                error = _error
            })
            .finally(() => {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('invalid date')
            })
    })

    it('fails on non-string userId', () => {
        let error
        const date = '2024-08-27T00:00:00Z'

        try {
            getEventByDate(123, date)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('value is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})