import data from '../data/index.js'

const getUser = username => {
    const user = data.findUser(user => user.username === username)

    if (user === null)
        throw new Error('user not found')

    return user.name
}

export default getUser