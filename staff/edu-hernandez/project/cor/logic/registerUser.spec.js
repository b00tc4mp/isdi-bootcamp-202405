import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

import { errors } from 'com'

const { ValidationError, DuplicityError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', () =>
        registerUser(
            'Charlie',
            'Brown',
            'user',
            'charlie@brown.com',
            'charliebrown',
            '123123123',
            '123123123'
        )
            .then(() => User.findOne({ username: 'charliebrown' }).lean())
            .then(user => {
                expect(user.name).to.equal('Charlie')
                expect(user.surname).to.equal('Brown')
                expect(user.email).to.equal('charlie@brown.com')

                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)
            .catch(error => {
                throw new Error(`test failed with error: ${error.message}`)
            })
    )

    it('fails on existing user with same email', () => {
        let _error

        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charliebrown',
            password: '123123123'
        })
            .then(() => registerUser(
                'Charlie',
                'Brown',
                'user',
                'charlie@brown.com',
                'charliebrown2',
                '123123123',
                '123123123'
            ))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on existing user with same username', () => {
        let _error

        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'organizer',
            email: 'charlie@brown.com',
            username: 'charliebrown',
            password: '123123123'
        })
            .then(() => registerUser(
                'Charlie',
                'Brown',
                'organizer',
                'charlie@brown.com',
                'charliebrown',
                '123123123',
                '123123123'
            ))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on existing organizer with same email', () => {
        let _error

        return User.create({
            name: 'Lucy',
            surname: 'Van Pelt',
            role: 'organizer',
            email: 'lucy@vanpelt.com',
            username: 'lucyvp',
            password: '123123123'
        })
            .then(() => registerUser(
                'Lucy',
                'Van Pelt',
                'organizer',
                'lucy@vanpelt.com',
                'lucyvp2',
                '123123123',
                '123123123'
            ))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on existing organizer with same username', () => {
        let _error
    
        return User.create({
            name: 'Snoopy',
            surname: 'Dog',
            role: 'organizer',
            email: 'snoopy@peanuts.com',
            username: 'snoopydog',
            password: '123123123'
        })
            .then(() => registerUser(
                'Snoopy',
                'Dog',
                'organizer',
                'snoopy@otheremail.com',
                'snoopydog',
                '123123123',
                '123123123'
            ))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })
    
    it('fails on non-string name', () => {
        let error

        try {
            registerUser(
                123,
                'Brown',
                'user',
                'charlie@brown.com',
                'charliebrown',
                '123123123',
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('name is not a string')
        }
    })

    it('fails on invalid name', () => {
        let error

        try {
            registerUser(
                '',
                'Brown',
                'user',
                'charlie@brown.com',
                'charliebrown',
                '123123123',
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid name')
        }
    })

    it('fails on non-string surname', () => {
        let error

        try {
            registerUser(
                'Charlie',
                123,
                'user',
                'charlie@brown.com',
                'charliebrown',
                '123123123',
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('surname is not a string')
        }
    })

    it('fails on invalid surname', () => {
        let error

        try {
            registerUser(
                'Charlie',
                '',
                'user',
                'charlie@brown.com',
                'charliebrown',
                '123123123',
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid surname')
        }
    })

    it('fails on non-string role', () => {
        let error

        try {
            registerUser(
                'Charlie',
                'Brown',
                123,
                'charlie@brown.com',
                'charliebrown',
                '123123123',
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('role is not a string')
        }
    })

    it('fails on invalid role', () => {
        let error

        try {
            registerUser(
                'Charlie',
                'Brown',
                'participant',
                'charlie@brown.com',
                'charliebrown',
                '123123123',
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid role')
        }
    })

    it('fails on non-string email', () => {
        let error

        try {
            registerUser(
                'Charlie',
                'Brown',
                'user',
                123,
                'charliebrown',
                '123123123',
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('email is not a string')
        }
    })

    it('fails on invalid email', () => {
        let error

        try {
            registerUser(
                'Charlie',
                'Brown',
                'user',
                '',
                'charliebrown',
                '123123123',
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid email')
        }
    })

    it('fails on non-string username', () => {
        let error

        try {
            registerUser(
                'Charlie',
                'Brown',
                'user',
                'charlie@brown.com',
                123,
                '123123123',
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            registerUser(
                'Charlie',
                'Brown',
                'user',
                'charlie@brown.com',
                '',
                '123123123',
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            registerUser(
                'Charlie',
                'Brown',
                'user',
                'charlie@brown.com',
                'charliebrown',
                123123123,
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on password short', () => {
        let error

        try {
            registerUser(
                'Charlie',
                'Brown',
                'user',
                'charlie@brown.com',
                'charliebrown',
                '123123',
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    it('fails on password with spaces', () => {
        let error

        try {
            registerUser(
                'Charlie',
                'Brown',
                'user',
                'charlie@brown.com',
                'charliebrown',
                '123123 123',
                '123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on non-string passwordRepeat', () => {
        let error

        try {
            registerUser(
                'Charlie',
                'Brown',
                'user',
                'charlie@brown.com',
                'charliebrown',
                '123123123',
                123123123
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on confirmation password with spaces', () => {
        let error

        try {
            registerUser(
                'Charlie',
                'Brown',
                'user',
                'charlie@brown.com',
                'charliebrown',
                '123123123',
                '123123 123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on password and confirmation password do not match', () => {
        let error

        try {
            registerUser(
                'Charlie',
                'Brown',
                'user',
                'charlie@brown.com',
                'charliebrown',
                '123123123',
                '123123123123'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('passwords do not match')
        }
    })

    after(() => mongoose.disconnect())
})