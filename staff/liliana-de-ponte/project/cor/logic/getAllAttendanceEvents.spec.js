import 'dotenv/config'
import getAllAttendanceEvents from './getAllAttendanceEvents.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Event } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('getAllAttendanceEvents', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Event.deleteMany()]))

    it('succeeds on existing user', () => {
        return Event.create({ author: new ObjectId().toString(), title: 'TRT', organizer: 'Sergio Canovas', date: new Date(2024 / 9 / 17), duration: '3 dias', description: 'un evento sobre ....', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, address: "Calle diputacion 37", city: 'Barcelona' })
            .then(() =>
                User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
                    .then(user =>
                        getAllAttendanceEvents(user.id)
                            .then(() => User.findOne({ username: 'samuspine' })
                                .then(event => expect(event.attendees).to.include(user.id))
                            )
                    )
            )
    })




    //     User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
    //         .then(() =>
    //             Event.create({ author: new ObjectId().toString(), title: 'TRT', organizer: 'Sergio Canovas', date: new Date(2024 / 9 / 17), duration: '3 dias', description: 'un evento sobre ....', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, address: "Calle diputacion 37", city: Barcelona })
    //                 .then(user =>
    //                     getAllAttendanceEvents(user.id)
    //                         .then(() => User.findOne({ username: 'samuspine' })
    //                             .then(event => expect(event.attendees).to.include(event.id))
    //                         )
    //                 )
    //         )
    // })

    it('fails on non-existing user', () => {
        let _error

        return getAllAttendanceEvents(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')

            })
    })

    it('fails on author not found', () => {
        let _error

        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(event => User.findOne(event.author))
            .then(user => getAllAttendanceEvents(user.id)
                .catch(error => _error = error)
                .finally(() => {
                    expect(_error).to.be.instanceOf(NotFoundError)
                    expect(_error.message).to.equal('author not found')
                })
            )
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllAttendanceEvents(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
