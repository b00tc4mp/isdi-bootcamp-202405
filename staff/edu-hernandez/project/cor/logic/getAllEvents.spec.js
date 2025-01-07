import 'dotenv/config'
import getAllEvents from './getAllEvents.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Event } from '../data/models.js'
import { errors } from 'com'

const { NotFoundError, OwnershipError } = errors
const { ObjectId } = Types

describe('getAllEvents', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Event.deleteMany()])
    )

    it('succeeds on existing user and event belongs to the user', () => {
        let _error
        let userId

        return User.create({
            name: 'User',
            surname: 'Test',
            role: 'organizer',
            email: 'user@test.com',
            username: 'usertest',
            password: '123123123'
        })
            .then(user => {
                userId = user._id.toString()
                return Event.create({
                    author: userId,
                    title: 'test event from cor',
                    image: 'https://example.com/event.jpg',
                    caption: 'event caption',
                    date: new Date(),
                    location:
                    {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: '08:00',
                })
            })
            .then(event => getAllEvents(userId, event.id))
            .finally(result => expect(result).to.be.undefined)
    })

    it('fails on non-existing user', () => {
        let _error
        const userObjectId = new ObjectId()

        return Event.create({
            author: userObjectId,
            title: 'Event title',
            image: 'https://example.com/event.jpg',
            caption: 'Event caption',
            date: new Date(),
            location: 
            {
                type: 'Point',
                coordinates: [41.3874, 2.1686]
            },
            time: '08:00'
        })
            .then(event => getAllEvents(userObjectId.toString(), event.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but event does not belong to user', () => {
        let _error

        return User.create({
            name: 'User',
            surname: 'Test',
            role: 'organizer',
            email: 'user@test.com',
            username: 'usertest',
            password: '123123123',
            avatar: '/avatar/profile.png'
        })
            .then(user =>
                Event.create({
                    author: new ObjectId(),
                    title: 'Test Event',
                    image: 'https://example.com/event.jpg',
                    caption: 'Event caption',
                    date: new Date(),
                    location: 
                    {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: '08:00'
                })
                    .then(event => getAllEvents(user.id, event.id))
                    .catch(error => _error = error)
                    .finally(() => {
                        expect(_error).to.be.instanceOf(NotFoundError)
                        expect(_error.message).to.equal('author not found')
                    })
            )
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})
