import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import getAllHCPs from './getAllHCPs.js'
import { User, HealthCareProvider, Location } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getAllHCPs', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([HealthCareProvider.deleteMany(), User.deleteMany()]))

    it('succeeds on get all HCPs', () =>
        HealthCareProvider.create([{ name: 'Hospital Clinic de Barcelona', image: 'https://lh5.googleusercontent.com/p/AF1QipMQiomAXhmZQulvgSqd7xBRbIrZaAidh4pcGYHh=w408-h544-k-no', street: 'C. de Villarroel, 170, L\'Eixample, 08036 Barcelona', phoneNumber: '932275400', webURL: 'http://www.clinicbarcelona.org/', openingHours: ['Open 24h'], tags: ['hospital', 'ong', 'ngo', 'VIH', 'HIV', 'STD', 'ITS', 'ETS', 'gonorrea', 'sifilis', 'clamidia', 'papiloma', 'virus', 'herpes', 'prueba', 'rapida', 'test', 'support', 'checkpoint', 'siphilis', 'gonorrhea'], location: new Location({ coordinates: [41.3894225, 2.1496325] }) }])
            .then(() => User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
                .then(user => getAllHCPs(user.id))
                .then(hcr => expect(hcr[0].name).to.equal('Hospital Clinic de Barcelona'))
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return HealthCareProvider.create([{ name: 'Hospital Clinic de Barcelona', image: 'https://lh5.googleusercontent.com/p/AF1QipMQiomAXhmZQulvgSqd7xBRbIrZaAidh4pcGYHh=w408-h544-k-no', street: 'C. de Villarroel, 170, L\'Eixample, 08036 Barcelona', phoneNumber: '932275400', webURL: 'http://www.clinicbarcelona.org/', openingHours: ['Open 24h'], tags: ['hospital', 'ong', 'ngo', 'VIH', 'HIV', 'STD', 'ITS', 'ETS', 'gonorrea', 'sifilis', 'clamidia', 'papiloma', 'virus', 'herpes', 'prueba', 'rapida', 'test', 'support', 'checkpoint', 'siphilis', 'gonorrhea'], location: new Location({ coordinates: [41.3894225, 2.1496325] }) }])
            .then(() => getAllHCPs(new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })


    it('fails on non-string userId', () => {
        let error

        try {
            getAllHCPs(123)
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
            getAllHCPs('')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    afterEach(() => Promise.all([HealthCareProvider.deleteMany(), User.deleteMany()]))

    after(() => mongoose.disconnect())
})
