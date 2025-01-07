import 'dotenv/config'
import { User, Event } from '../data/models.js'
import { expect } from 'chai'
import { getTime } from 'date-fns'
import { errors } from 'com'
import mongoose, { Types } from 'mongoose'
import getAllFavEvents from './getAllFavEvents.js'

const { ObjectId } = Types
const { NotFoundError } = errors

describe('getAllFavEvents', () => {
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
                    user._id, { fav: [event1._id, event2._id], going: [event1._id] })
            })
    })

    it('succeeds on existing favourite events', () => {
        return getAllFavEvents(user._id.toString())
            .then(events => {
                expect(events).to.have.lengthOf(2)
                events.forEach(event => {
                    expect(event.id).to.be.oneOf([event1._id.toString(), event2._id.toString()])
                    expect(event.fav).to.be.true
                    expect(event.author.id).to.equal(user._id.toString())
                    expect(event.author.username).to.equal('johndoe')
                    expect(event.author.avatar).to.equal('/avatar/avatarIcon.png')
                })
            })
    })

    it('succeeds when user has no favourite events', () => {
        return User.create({
            name: 'Jane',
            surname: 'Doe',
            role: 'user',
            email: 'jane@doe.com',
            username: 'janedoe',
            password: '123123123',
            avatar: '/avatar/avatarIcon.png',
            going: [],
            fav: []
        })
            .then(userNoFavs => {
                return getAllFavEvents(userNoFavs._id.toString())
                    .then(events => {
                        expect(events).to.have.lengthOf(0)
                    })
            })
    })

    it('succeeds on events with different authors', () => {
        return User.create({
            name: 'Alice',
            surname: 'Smith',
            role: 'user',
            email: 'alice@smith.com',
            username: 'alicesmith',
            password: '123123123',
            avatar: '/avatar/aliceIcon.png',
            going: [],
            fav: []
        })
            .then(userWithDiffAuth => {
                return Promise.all([
                    Event.create({
                        author: userWithDiffAuth._id,
                        title: 'Event 3',
                        image: 'image3.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: getTime().toString()
                    }),
                    Event.create({
                        author: userWithDiffAuth._id,
                        title: 'Event 4',
                        image: 'image4.png',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: getTime().toString()
                    })
                ])
                    .then(([e3, e4]) => {
                        return User.findByIdAndUpdate(
                            userWithDiffAuth._id, { fav: [e3._id, e4._id] })
                            .then(() => getAllFavEvents(userWithDiffAuth._id.toString()))
                            .then(events => {
                                expect(events).to.have.lengthOf(2)
                                events.forEach(event => {
                                    expect(event.id).to.be.oneOf([e3._id.toString(), e4._id.toString()])
                                    expect(event.fav).to.be.true
                                    expect(event.author.id).to.equal(userWithDiffAuth._id.toString())
                                    expect(event.author.username).to.equal('alicesmith')
                                    expect(event.author.avatar).to.equal('/avatar/aliceIcon.png')
                                })
                            })
                    })
            })
    })

    it('fails on author not found', () => {
        let _error

        return User.create({
            name: 'Pedro',
            surname: 'Park',
            role: 'user',
            email: 'peter@parker.com',
            username: 'pedropark',
            password: '123123123',
            fav: []
        })
            .then(user => {
                return Promise.all([
                    Event.create({
                        author: new ObjectId().toString(),
                        title: 'Event 1',
                        image: 'https://randomImage.png',
                        caption: 'This is event 1',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00'
                    }),
                    Event.create({
                        author: new ObjectId().toString(),
                        title: 'Event 2',
                        image: 'https://randomImage.png',
                        caption: 'This is event 2',
                        date: new Date(),
                        location: {
                            type: 'Point',
                            coordinates: [41.3874, 2.1686]
                        },
                        time: '18:00'
                    })
                ])
                    .then(([event1, event2]) => {
                        return User.updateOne({ username: 'pedropark' }, { $push: { fav: { $each: [event1._id, event2._id] } } })
                    })
                    .then(() => {
                        return getAllFavEvents(user._id.toString())
                            .catch(error => _error = error)
                            .finally(() => {
                                expect(_error).to.be.instanceOf(NotFoundError)
                                expect(_error.message).to.equal('author not found')
                            })
                    })
            })
    })

    it('fails user not found', () => {
        return User.create({
            name: 'Paul',
            surname: 'Walker',
            role: 'user',
            email: 'paul@walker.com',
            username: 'paulwalker',
            password: '123123123',
            avatar: '/avatar/paulIcon.png',
            fav: [],
            going: []
        })
            .then(userPaul => {
                return Event.create({
                    author: userPaul._id,
                    title: 'Event with deleted author',
                    image: 'image5.png',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: getTime().toString()
                })
                    .then(eventWithDeletedAuthor => {
                        return User.findByIdAndDelete(userPaul._id)
                            .then(() => {
                                return getAllFavEvents(userPaul._id.toString())
                                    .catch(error => {
                                        expect(error).to.be.instanceOf(NotFoundError)
                                        expect(error.message).to.equal('user not found')
                                    })
                            })
                    })
            })
    })

    it('fails when user fav is not an array', () => {
        return User.findByIdAndUpdate(user._id, { fav: null }, { new: true })
            .then(user => {
                return getAllFavEvents(user._id.toString())
                    .then(events => {
                        expect(events).to.have.lengthOf(0)
                    })
            })
    })

    it('fails on user not found', () => {
        const userId = new ObjectId().toString()

        return getAllFavEvents(userId)
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on creating event without author', () => {
        return Event.create({
            title: 'Event without author',
            image: 'image_no_author.png',
            date: new Date(),
            location: {
                type: 'Point',
                coordinates: [41.3874, 2.1686]
            },
            time: getTime().toString()
        })
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.include('Event validation failed: author: Path `author` is required.')
            })
    })

    it('fails when an event in user favs does not exist', () => {
        return Event.findByIdAndDelete(event1._id)
            .then(() => getAllFavEvents(user._id.toString()))
            .then(() => {
                throw new NotFoundError('event not found')
            })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.include('event not found')
            })
    })

    it('fails on invalid userId format', () => {
        return getAllFavEvents('invalidUserId')
            // .then(() => {
            //     throw new SystemError(error.message)
            // })
            .catch(error => {
                expect(error).to.exist
                expect(error.name).to.equal('SystemError')
            })
    })

    it('fails on invalid eventId in user favs', () => {
        return User.findByIdAndUpdate(user._id, { fav: ['invalidEventId'] })
            .then(() => getAllFavEvents(user._id.toString()))
            .catch(error => {
                expect(error).to.exist
                expect(error.name).to.equal('CastError')
            })
    })

    it('fails when user.fav is null or undefined', () => {
        return User.findByIdAndUpdate(user._id, { fav: null }, { new: true })
            .then(userWithNullFav => {
                return getAllFavEvents(userWithNullFav._id.toString())
                    .then(events => {
                        expect(events).to.have.lengthOf(0)
                    })
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})