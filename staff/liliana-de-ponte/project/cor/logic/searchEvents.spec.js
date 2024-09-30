import 'dotenv/config'
import searchEvents from './searchEvents.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Event } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('searchEvents', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    it('succeds on search event by title, description and location', () => {
        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(user => {
                return Event.create({ author: user.id.toString(), title: 'TRT', organizer: 'Sergio Canovas', date: new Date(2024 / 9 / 17), duration: '3 dias', description: 'un evento sobre ....', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, address: 'diputacion 37', city: 'Barcelona' })
                    .then(() => Event.create({ author: user.id.toString(), title: 'FAI', organizer: 'Sergio Canovas', date: 2024 / 9 / 30, duration: '4 horas', description: 'aprenderas de ...', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, address: 'diputacion 38', city: 'Barcelona' }))
                    .then(() => {
                        return searchEvents(user.id, 'evento', 1, [41.37946397948531, 2.1521122255990233])
                    })
                    .then(events => {
                        expect(events[0].title).to.equal('TRT')
                        expect(events[0].description).to.equal('un evento sobre ....')

                    })
            })
    })


    it('fails on non-existing user', () => {
        let _error

        return searchEvents(new ObjectId().toString(), 'evento', 1, [41.37946397948531, 2.1521122255990233])
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')

            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            searchEvents(123, 'query', 1, [41.37946397948531, 2.1521122255990233])
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
            searchEvents(new ObjectId().toString(), 123, 1, [41.37946397948531, 2.1521122255990233])
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
            searchEvents(new ObjectId().toString(), 'query', '1', [41.37946397948531, 2.1521122255990233])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('distance is not a number')
        }
    })

    it('fails on non-array coords', () => {
        let error

        try {
            searchEvents(new ObjectId().toString(), 'query', 1, '41.37946397948531, 2.1521122255990233')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('coords is not an array')
        }
    })


    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})

