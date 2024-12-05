import data from '../data/index.js'

import validate from '../validate.js'

const authenticateUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    if (user.password !== password) {
        throw new Error('wrong password')
    }
}

export default authenticateUser