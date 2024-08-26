import 'dotenv/config';
import registerUser from './registerUser.js';
import { expect } from 'chai';
import bcrypt from 'bcryptjs';
import { User } from '../data/models.js';
import mongoose from 'mongoose';
import { errors } from '../../com/index.js';

const { ValidationError, DuplicityError } = errors;

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI));

    beforeEach(() => User.deleteMany().exec());

    it('succeeds on new tenant user', () =>
        registerUser('John', 'Doe', 'john.doe@egmail.com', 'johndoe', '12345678A', 'password123', 'password123', 'tenant')
            .then(() => User.findOne({ username: 'johndoe' }).lean())
            .then(user => {
                expect(user).to.not.be.null;
                expect(user.name).to.equal('John');
                expect(user.surname).to.equal('Doe');
                expect(user.email).to.equal('john.doe@egmail.com');
                expect(user.role).to.equal('tenant');

                return bcrypt.compare('password123', user.password);
            })
            .then(match => expect(match).to.be.true)
    );

    it('succeeds on new landlord user', () =>
        registerUser('Jane', 'Smith', 'jane.smith@egmail.com', 'janesmith', '87654321B', 'password123', 'password123', 'landlord')
            .then(() => User.findOne({ username: 'janesmith' }).lean())
            .then(user => {
                expect(user).to.not.be.null;
                expect(user.name).to.equal('Jane');
                expect(user.surname).to.equal('Smith');
                expect(user.email).to.equal('jane.smith@egmail.com');
                expect(user.role).to.equal('landlord');

                return bcrypt.compare('password123', user.password);
            })
            .then(match => expect(match).to.be.true)
    );

    it('fails on existing user with same email', () => {
        let _error;

        return User.create({ name: 'John', surname: 'Doe', email: 'john.doe@egmail.com', username: 'johndoe', password: 'password123', role: 'tenant' })
            .then(() => registerUser('Jane', 'Smith', 'john.doe@egmail.com', 'janesmith', '87654321B', 'password123', 'password123', 'tenant'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError);
                expect(_error.message).to.equal('user already exists');
            });
    });

    it('fails on existing user with same username', () => {
        let _error;

        return User.create({ name: 'John', surname: 'Doe', email: 'john.doe@egmail.com', username: 'johndoe', password: 'password123', role: 'tenant' })
            .then(() => registerUser('Jane', 'Smith', 'jane.smith@egmail.com', 'johndoe', '87654321B', 'password123', 'password123', 'tenant'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError);
                expect(_error.message).to.equal('user already exists');
            });
    });


    it('fails on non-string name', () => {
        let error

        try {
            registerUser(123, 'Doe', 'john.doe@egmail.com', 'johndoe', 'password123', 'password123')
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
            registerUser('', 'Doe', 'john.doe@egmail.com', 'johndoe', 'password123', 'password123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid name')
        }
    })

    it('fails on invalid surname', () => {
        let error

        try {
            registerUser('John', '', 'john.doe@egmail.com', 'johndoe', 'password123', 'password123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid surname')
        }
    })

    it('fails on non-string email', () => {
        let error

        try {
            registerUser('John', 'Doe', 123, 'johndoe', 'password123', 'password123')
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
            registerUser('John', 'Doe', '', 'johndoe', 'password123', 'password123')
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
            registerUser('John', 'Doe', 'john.doe@egmail.com', 123, 'password123', 'password123')
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
            registerUser('John', 'Doe', 'john.doe@egmail.com', '', 'password123', 'password123')
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
            registerUser('John', 'Doe', 'john.doe@egmail.com', 'johndoe', 123123123, 'password123')
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
            registerUser('John', 'Doe', 'john.doe@egmail.com', 'johndoe', 'pass', 'pass')
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
            registerUser('John', 'Doe', 'john.doe@egmail.com', 'johndoe', 'password 123', 'password 123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on non-matching passwords', () => {
        let error

        try {
            registerUser('John', 'Doe', 'john.doe@egmail.com', 'johndoe', 'password123', 'password456')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('passwords do not match')
        }
    })

    afterEach(() => User.deleteMany().exec())

    after(() => mongoose.disconnect())
})
