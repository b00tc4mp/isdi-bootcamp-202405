import data from '../data/index.js'

import validate from '../validate.js'

const getUser = username => {
    validate.username(username)

    const user = data.findUser(user => user.username === username)

    if (user === null) throw new Error('User not found')

    delete user.password

    return user
}

export default getUser