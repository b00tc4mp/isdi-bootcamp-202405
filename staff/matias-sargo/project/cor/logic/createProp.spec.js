import 'dotenv/config';
import mongoose from 'mongoose';
import { expect } from 'chai';
import createProp from './createProp.js';
import { Property, User } from '../data/models.js';
import { errors } from '../../com/index.js';

const { ValidationError, SystemError, NotFoundError } = errors;

describe('createProp', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }));

    beforeEach(() => {
        // Limpiar la base de datos antes de cada prueba
        return Promise.all([
            Property.deleteMany().exec(),
            User.deleteMany().exec()
        ]);
    });

    it('should successfully create a property', () => {
        const user = new User({
            name: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
            username: 'johndoe',
            password: '123123123',
            dni: 'y12345678x'
        });

        return user.save()
            .then(savedUser => {
                return createProp(
                    savedUser._id.toString(),
                    ['https://example.com/image1.jpg'],
                    'Beautiful apartment',
                    'This is a lovely 2 bedroom apartment in the city center.',
                    40.7128,
                    -74.0060,
                    1500,
                    'apartment',
                    '123 Main St, New York, NY',
                    true
                );
            })
            .then(property => {
                expect(property).to.exist;
                expect(property.title).to.equal('Beautiful apartment');
                expect(property.owner.toString()).to.equal(user._id.toString());
                expect(property.location.coordinates).to.deep.equal([-74.0060, 40.7128]);
                expect(property.price).to.equal(1500);
                expect(property.type).to.equal('apartment');
                expect(property.address).to.equal('123 Main St, New York, NY');
                expect(property.available).to.be.true;
            });
    });

    it('should fail if required fields are missing', () => {
        const user = new User({
            name: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
            username: 'johndoe',
            password: '123123123',
            dni: 'y12345678x'
        });

        return user.save()
            .then(savedUser => {
                return createProp(
                    savedUser._id.toString(),
                    [], // Empty images array
                    'Beautiful apartment',
                    'This is a lovely 2 bedroom apartment in the city center.',
                    40.7128,
                    -74.0060,
                    1500,
                    'apartment',
                    '123 Main St, New York, NY',
                    true
                );
            })
            .catch(error => {
                expect(error).to.be.instanceOf(ValidationError);
                expect(error.message).to.equal('images is not an array');
            });
    });

    it('should fail if user does not exist', () => {
        return createProp(
            'invalidUserId', // Non-existent user
            ['https://example.com/image1.jpg'],
            'Beautiful apartment',
            'This is a lovely 2 bedroom apartment in the city center.',
            40.7128,
            -74.0060,
            1500,
            'apartment',
            '123 Main St, New York, NY',
            true
        ).catch(error => {
            expect(error).to.be.instanceOf(NotFoundError);
            expect(error.message).to.equal('user not found');
        });
    });

    afterEach(() => Property.deleteMany().exec());

    after(() => mongoose.disconnect());
});
