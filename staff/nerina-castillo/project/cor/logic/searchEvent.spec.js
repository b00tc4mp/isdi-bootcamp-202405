import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Event } from '../data/models.js'
import errors from '../../com/errors.js'
import searchEvent from './searchEvent.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('searchEvents', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([Event.deleteMany(), User.deleteMany()]))

    it('succeeds on search event by name, description and location', () => {
        let userId

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                userId = user._id.toString()

                return Promise.all([
                    Event.create({
                        author: userId,
                        image: 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver',
                        title: 'Barrenfields',
                        description: 'Barrenfields concert',
                        location: {
                            type: 'Point',
                            coordinates: [40.7128, -74.0060]
                        },
                        startDate: new Date(),
                        startTime: '21:30',
                        tickets: 'http://lhdbs'
                    }),
                    Event.create({
                        author: userId,
                        image: 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver',
                        title: 'luis Aragofest',
                        description: 'Concierto en las canchas de Hortaleza',
                        location: {
                            type: 'Point',
                            coordinates: [40.7128, -74.0060]
                        },
                        startDate: new Date(),
                        startTime: '21:30',
                        tickets: 'http://lhdbs'
                    })
                ])
            })
            .then(() => {
                return searchEvent(userId, 'Barrenfields', 1, [40.7128, -74.006])
            })
            .then(events => {
                expect(events).to.be.an('array')
                expect(events).to.have.lengthOf(1)
                expect(events[0].title).to.equal('Barrenfields')
                expect(events[0].description).to.equal('Barrenfields concert')
            })
            .catch(error => {
                throw new Error(error)
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return searchEvent(new ObjectId().toString(), 'Barrenfields', 1, [40.7128, -74.006])
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            searchEvent(123, 'Barrenfields', 1, [40.7128, -74.006])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string query', () => {
        let error

        try {
            searchEvent(new ObjectId().toString(), 123, 1, [40.7128, -74.006])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('query is not a string')
        }
    })

    it('fails on non-number distance', () => {
        let error

        try {
            searchEvent(new ObjectId().toString(), 'Barrencfields', '1', [40.7128, -74.006])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('distance is not a number')
        }

        it('fails on non-array coords', () => {
            let error

            try {
                searchEvent(new ObjectId().toString(), 'Barrenfields', 1, new Object)
            } catch (_error) {
                error = _error
            } finally {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('coords is not an array')
            }
        })

        it('fails on non-number coords[0]', () => {
            let error

            try {
                searchEvent(new ObjectId().toString(), 'Barrenfields', 1, ['40.7128', -74.006])
            } catch (_error) {
                error = _error
            } finally {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('latitude is not a number')
            }
        })
    })

    it('fails on non-number coords[1]', () => {
        let error

        try {
            searchEvent(new ObjectId().toString(), 'string', 1, [40.7128, '-74.006'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('longitude is not a number')
        }
    })

    afterEach(() => Promise.all([Event.deleteMany(), User.deleteMany()]))

    after(() => mongoose.disconnect())
})

