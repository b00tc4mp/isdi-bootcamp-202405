import data from '../data/index.js'
import validate from '../validate.js'

const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    if (password !== passwordRepeat) {
        callback(new Error('passwords do not match'))

        return
    }

    data.findUser(user => user.email === email, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (user !== null) {
            callback(new Error('email already exists'))

            return
        }

        data.findUser(user => user.username === username, (error, user) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            if (user !== null) {
                callback(new Error('username already exists'))

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

            data.insertUser(newUser, error => {
                if (error) {
                    callback(new Error(error.message))

                    return
                }

                callback(null)
            })
        })
    })
}

export default registerUser