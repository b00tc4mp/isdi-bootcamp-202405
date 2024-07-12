import data from '../data/index.js'

const getUser = () => {
    const user = data.findUser(user => user.username === sessionStorage.username)

    if (user === null) throw new Error('User not found')

    delete user.password

    return user
}

export default getUser