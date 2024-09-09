import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import addReview from './addReview.js'
import { User, Review } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError, DuplicityError } = errors

describe('addReviews', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Review.deleteMany()]))

    it('succeds on new review without rating', () => {
        User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
            .then(petsitter => {
                User.create({ author: petsitter.id, image: 'https://hospitalveterinariodonostia.com/', name: 'Tatiana', city: 'Barcelona', description: 'Por favor, funciona de una santa vez', email: 'tati@garcia.com', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] })
                    .then(petsitter => {
                        addReview(user.id, petsitter.id, 'me encanta esta guarderia')
                    })
                    .then(review => {
                        expect(review.comment).to.equal('me encanta esta guarderia')
                        expect(review.rate).to.equal(0)
                    })
            })
    })

    it('succeds on new review with rating', () => {
        User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
            .then(petsitter => {
                User.create({ author: petsitter.id, image: 'https://hospitalveterinariodonostia.com/', name: 'Tatiana', city: 'Barcelona', description: 'Por favor, funciona de una santa vez', email: 'tati@garcia.com', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] })
                    .then(petsitter => {
                        addReview(user.id, petsitter.id, 'me encanta esta guarderia')
                    })
                    .then(review => {
                        expect(review.comment).to.equal('me encanta esta guarderia')
                        expect(review.rate).to.equal(5)
                    })
            })

    })

    it('succeeds on valid input and creates a review', () => {
        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Alberto', surname: 'Garcia', email: 'abt@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
            .then(user =>
                User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Tatiana', city: 'Barcelona', description: 'Por favor, funciona de una santa vez', email: 'tati@garcia.com', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] })
                    .then(petsitter => {
                        return addReview(petsitter._id.toString(), user._id.toString(), 'me encanta esta guarderia', 5)
                            .then(review => {
                                expect(review).to.exist
                                expect(review.comment).to.equal('me encanta esta guarderia')
                                expect(review.rate).to.equal(5)
                                expect(review.petsitter._id.toString()).to.equal(petsitter._id.toString())
                                expect(review.author._id.toString()).to.equal(user._id.toString())
                            })
                    })
            )
    })

    it('fails on non existing author', () => {
        let error

        return addReview('66cc32b55e0e1ff3003b3efa', '66cc32b55e0e1ff3003b3efa', 'me encanta esta guarderia', 5)
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('author not found')
            })
    })

    it('fails on non existing petsitter', () => {
        let error

        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
            .then(user => addReview('66cc32b55e0e1ff3003b3efa', user.id, 'me encanta esta guarderia', 5))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('petsitter not found')
            })
    })

    it('fails on non string userId', () => {
        let error

        try {
            addReview('66cc32b55e0e1ff3003b3efa', 123, 'me encanta esta guarderia', 5)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non string petsitterId', () => {
        let error

        try {
            addReview(123, '66cc32b55e0e1ff3003b3efa', 'me encanta esta guarderia', 5)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('petsitterId is not a string')
        }
    })

    it('fails on invalid petsitterId', () => {
        let error

        try {
            addReview('', '66cc32b55e0e1ff3003b3efa', 'me encanta esta guarderia', 5)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid petsitterId')
        }
    })

    it('fails on non-string comment', () => {
        let error

        try {
            addReview('66cc32b55e0e1ff3003b3efa', '66cc32b55e0e1ff3003b3efa', 123, 5)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('comment is not a string')
        }
    })

    it('fails on non-number rate', () => {
        let error

        try {
            addReview('66cc32b55e0e1ff3003b3efa', '66cc32b55e0e1ff3003b3efa', 'me encanta esta guarderia', 'hghg')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('rate is not a number')
        }
    })

    it('should throw DuplicityError if the user has already reviewed the petsitter', () => {
        let author, petsitter

        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
            .then(_author => {
                author = _author
                return User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Tatiana', city: 'Barcelona', description: 'Por favor, funciona de una santa vez', email: 'tati@garcia.com', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] })
            })
            .then(_petsitter => {
                petsitter = _petsitter

                return Review.create({
                    author: author._id,
                    petsitter: petsitter._id,
                    comment: 'Buena experiencia',
                    rate: 4
                })
            })
            .then(() => {
                return Review.create({
                    author: author._id,
                    petsitter: petsitter._id,
                    comment: 'Excelente servicio',
                    rate: 5
                })
            })
            .catch(error => {
                if (error.code === 11000) {  // Código 11000 significa duplicidad de clave en MongoDB
                    throw new DuplicityError('ya has hecho una review a este petsitter')
                }
                throw error
            })
            .catch(error => {
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal('ya has hecho una review a este petsitter')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Review.deleteMany()]))

    after(() => mongoose.disconnect())
})
