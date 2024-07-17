import data from '../data/index.js'

import validate from '../validate.js'

const authenticateUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    const user = data.findUser(user => user.username === username)

    if (user === null)
        throw new Error('User not found')

    if (user.password !== password)
        throw new Error('Wrong password')
}

export default authenticateUser