import data from '../data/index.js'

import validate from '../validate.js'

export default (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    if (password !== passwordRepeat)
        throw new Error('Passwords do not match')

    data.users.findOne({ email })
        .then(user => {
            if (user) {
                callback(new Error('Email already exists'))

                return
            }

            data.users.findOne({ username })
                .then(user => {
                    if (user) {
                        callback(new Error('Username already exists'))

                        return
                    }

                    const newUser = {
                        name,
                        surname,
                        email,
                        username,
                        password,
                        favs: [],
                        following: [],
                        avatar: 'https://svgsilh.com/svg/145535-707070.svg'
                    }

                    data.users.insertOne(newUser)
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}