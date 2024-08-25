import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Event } from '../data/models.js'
import errors from '../../com/errors.js'
import getAllEvents from './getAllEvents.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('getAllEvents', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    it('succeeds on existing user listing all events', () => {
        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Event.create({ author: user.id, image: 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', title: 'Barrenfields', description: 'Barrenfields concert', location: { type: 'Point', coordinates: [40.7128, -74.0060] }, startDate: new Date(), startTime: '21:30', tickets: 'http://lhdbs' })
                    .then(() =>
                        Event.create({ author: user.id, image: null, title: 'luiiisss', description: 'Luis Aragofest', location: { type: 'Point', coordinates: [40.7128, -74.0060] }, startDate: new Date(), startTime: '21:30', tickets: 'http://lhdbs' })
                            .then(() =>
                                getAllEvents(user.id)
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
                            ))
            )
    })

    it('fails on event with non-existing author', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                return Event.create({
                    author: new ObjectId().toString(),
                    image: 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif',
                    title: 'Barrenfields',
                    description: 'Barrenfields concert',
                    location: { type: 'Point', coordinates: [40.7128, -74.0060] },
                    startDate: new Date(),
                    startTime: '21:30',
                    tickets: 'http://lhdbs'
                })
                    .then(() => getAllEvents(user.id))
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

        return getAllEvents(new ObjectId().toString(), 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'Barrenfields concert', { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), new Date())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllEvents(123, 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'Barrenfields concert', { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), new Date())
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