import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import searchHCP from './searchHCP.js'
import { User, HealthCareProvider, Location } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('searchHCP', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([HealthCareProvider.deleteMany(), User.deleteMany()]))

    it('succeeds on searchHCP by name and location', () => {
        return HealthCareProvider.create([{ name: 'Hospital Universitario Hermanos Trias y Pujol', image: 'https://lh5.googleusercontent.com/p/AF1QipMJ_79tm2UDI6OfUJ4IB40W4HZNQ8Zfez7zENs1=w408-h306-k-no', street: 'Carretera de Canyet, s/n, 08916 Badalona, Barcelona', phoneNumber: '934651200', webURL: 'http://germanstriashospital.cat/', openingHours: ['Open 24h'], tags: ['hospital', 'VIH', 'HIV', 'STD', 'ITS', 'ETS', 'gonorrea', 'sifilis', 'clamidia', 'papiloma', 'virus', 'herpes', 'prueba', 'rapida', 'test', 'checkpoint', 'siphilis', 'gonorrhea'], location: new Location({ coordinates: [41.481187, 2.2375473] }) }])
            .then(() => HealthCareProvider.create([{ name: 'ONG Stop', image: 'https://lh5.googleusercontent.com/p/AF1QipNUbRP_zaek0wH7wJQd0Uo7qpVpkoF5CtWVJr_-=w408-h725-k-no', street: 'C/ del Consell de Cent, 295, 4ª 1ª, Eixample, 08007 Barcelona', phoneNumber: '934522435', webURL: 'https://stopsida.org/', openingHours: ['Mon: 16:00-19:30', 'Tue: 10:00-14:00 / 16:00-19:30', 'Wed: 10:00-14:00 / 16:00-19:30', 'Thu: 10:00-14:00 / 16:00-19:30', 'Fri: 10:00-14:00', 'Sat: Closed', 'Sun: Closed'], tags: ['ong'], location: new Location({ coordinates: [41.3887176, 2.1595069] }) }])
                .then(() => User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
                    .then(user => searchHCP(user.id, 'hospital', 1, [41.4896223, 2.2375339]))
                    .then(hcr => {
                        expect(hcr[0].name).to.equal('Hospital Universitario Hermanos Trias y Pujol')
                    })
                )
            )
    })

    it('succeeds on searchHCP by tags, and location', () => {
        return HealthCareProvider.create([{ name: 'Hospital Universitario Hermanos Trias y Pujol', image: 'https://lh5.googleusercontent.com/p/AF1QipMJ_79tm2UDI6OfUJ4IB40W4HZNQ8Zfez7zENs1=w408-h306-k-no', street: 'Carretera de Canyet, s/n, 08916 Badalona, Barcelona', phoneNumber: '934651200', webURL: 'http://germanstriashospital.cat/', openingHours: ['Open 24h'], tags: ['hospital', 'VIH', 'HIV', 'STD', 'ITS', 'ETS', 'gonorrea', 'sifilis', 'clamidia', 'papiloma', 'virus', 'herpes', 'prueba', 'rapida', 'test', 'checkpoint', 'siphilis', 'gonorrhea'], location: new Location({ coordinates: [41.481187, 2.2375473] }) }])
            .then(() => HealthCareProvider.create([{ name: 'ONG Stop', image: 'https://lh5.googleusercontent.com/p/AF1QipNUbRP_zaek0wH7wJQd0Uo7qpVpkoF5CtWVJr_-=w408-h725-k-no', street: 'C/ del Consell de Cent, 295, 4ª 1ª, Eixample, 08007 Barcelona', phoneNumber: '934522435', webURL: 'https://stopsida.org/', openingHours: ['Mon: 16:00-19:30', 'Tue: 10:00-14:00 / 16:00-19:30', 'Wed: 10:00-14:00 / 16:00-19:30', 'Thu: 10:00-14:00 / 16:00-19:30', 'Fri: 10:00-14:00', 'Sat: Closed', 'Sun: Closed'], tags: ['ong'], location: new Location({ coordinates: [41.3887176, 2.1595069] }) }])
                .then(() => User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
                    .then(user => searchHCP(user.id, 'hospital', 1, [41.4896223, 2.2375339]))
                    .then(hcr => {
                        expect(hcr[0].name).to.equal('Hospital Universitario Hermanos Trias y Pujol')
                    })
                )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return HealthCareProvider.create([{ name: 'Hospital Clinic de Barcelona', image: 'https://lh5.googleusercontent.com/p/AF1QipMQiomAXhmZQulvgSqd7xBRbIrZaAidh4pcGYHh=w408-h544-k-no', street: 'C. de Villarroel, 170, L\'Eixample, 08036 Barcelona', phoneNumber: '932275400', webURL: 'http://www.clinicbarcelona.org/', openingHours: ['Open 24h'], tags: ['hospital', 'ong', 'ngo', 'VIH', 'HIV', 'STD', 'ITS', 'ETS', 'gonorrea', 'sifilis', 'clamidia', 'papiloma', 'virus', 'herpes', 'prueba', 'rapida', 'test', 'support', 'checkpoint', 'siphilis', 'gonorrhea'], location: new Location({ coordinates: [41.3894225, 2.1496325] }) }])
            .then(() => searchHCP(new ObjectId().toString(), 'string', 1, [41.4896223, 2.2375339]))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            searchHCP(123, 'string', 1, [41.4896223, 2.2375339])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on invalid userId', () => {
        let error

        try {
            searchHCP('', 'string', 1, [41.4896223, 2.2375339])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string query', () => {
        let error

        try {
            searchHCP(new ObjectId().toString(), 123, 1, [41.4896223, 2.2375339])
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
            searchHCP(new ObjectId().toString(), 'string', 'number', [41.4896223, 2.2375339])
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
            searchHCP(new ObjectId().toString(), 'string', 1, new Object)
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
            searchHCP(new ObjectId().toString(), 'string', 1, ['string', 2.2375339])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('longitude is not a number')
        }
    })

    it('fails on non-number coords[1]', () => {
        let error

        try {
            searchHCP(new ObjectId().toString(), 'string', 1, [41.4896223, 'string'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('latitude is not a number')
        }
    })

    afterEach(() => Promise.all([HealthCareProvider.deleteMany(), User.deleteMany()]))

    after(() => mongoose.disconnect())
})
