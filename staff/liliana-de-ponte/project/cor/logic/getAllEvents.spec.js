import 'dotenv/config'
import getAllEvents from './getAllEvents.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Event } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('getAllEvents', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    it('succeds on existing user', () =>
        User.create({ name: 'Lili', surname: 'De Ponte', email: 'lili@deponte.com', username: 'lilideponte', password: '123456789' })
            .then(user =>
                Event.create({ author: user.id, title: 'TRT', organizer: 'Sergio Canovas', date: new Date(), duration: '3 dias', description: 'un evento sobre ....', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, address: 'diputacion 37', city: 'Barcelona' })
                    .then(() =>
                        Event.create({ author: user.id, title: 'FAI', organizer: 'Sergio Canovas', date: new Date(), duration: '4 dias', description: 'formador de algo impacto', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, address: 'diputacion 38', city: 'Barcelona' })
                            .then(() =>
                                getAllEvents(user.id)
                                    .then(events => {
                                        expect(events[0].author.id).to.equal(user.id.toString())
                                        expect(events[1].author.id).to.equal(user.id.toString())

                                    })

                            )
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return getAllEvents(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')

            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllEvents(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})



