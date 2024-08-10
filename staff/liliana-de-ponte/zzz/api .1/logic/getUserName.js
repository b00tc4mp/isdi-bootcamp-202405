import data from '../data/index.js'

import validate from '../validate.js'

const getUserName = username => {
    validate.username(username)

    const user = data.findUser(user => user.username === username)

    if (user === null) //gestion de errores
        throw new Error('user not found')

    return user.name
}

export default getUserName