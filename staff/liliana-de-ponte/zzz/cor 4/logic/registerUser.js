import data from '../data/index.js'
import validate from '../validate.js'

const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    if (password !== passwordRepeat)
        callback(new Error('passwords do not match'))

    data.users.findOne({ email })
        .then(user => {
            if (user) {
                callback(new Error('user already exists'))

                return
            }

            data.users.findOne({ username })
                .then(user => {
                    if (user) {
                        callback(new Error('user already exists'))

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
                        avatar: 'https://www.shutterstock.com/shutterstock/photos/1284452899/display_1500/stock-vector-illustrator-of-unicorn-cartoon-pony-horse-cartoon-dream-pastel-color-happy-unicorn-expressions-1284452899.jpg'
                    }

                    data.users.insertOne(newUser)
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))

                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}

export default registerUser