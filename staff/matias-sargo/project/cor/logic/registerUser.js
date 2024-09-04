import bcrypt from 'bcryptjs';
import { User } from '../data/models.js';
import { validate, errors } from 'com';

const { ValidationError, DuplicityError, SystemError } = errors;

export default (name, surname, email, username, dni, password, passwordRepeat, role = 'tenant') => {
    validate.name(name);
    validate.name(surname, 'surname');
    validate.email(email);
    validate.string(dni);
    validate.username(username);
    validate.password(password);
    validate.string(role, 'role');

    if (password !== passwordRepeat) throw new ValidationError('passwords do not match');

    
    const validRoles = ['owner', 'tenant'];
    if (!validRoles.includes(role)) {
        throw new ValidationError('invalid role');
    }

    return User.findOne({ email }).lean()
        .catch(error => { throw new SystemError(error.message); })
        .then(user => {
            if (user) throw new DuplicityError('user already exists');

            return User.findOne({ username }).lean()
                .catch(error => { throw new SystemError(error.message); });
        })
        .then(user => {
            if (user) throw new DuplicityError('user already exists');

            return User.findOne({ dni }).lean()
                .catch(error => { throw new SystemError(error.message); });
        })
        .then(user => {
            if (user) throw new DuplicityError('user already exists');

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message); });
        })
        .then(hash =>
            User.create({
                name,
                surname,
                email,
                username,
                dni,
                password: hash,
                role,
                profile: {
                    bio: '',
                    rating: 0,
                    reviews: []
                }
            })
                .then(createdUser => createdUser) 
                .catch(error => { throw new SystemError(error.message); })
        );
};
