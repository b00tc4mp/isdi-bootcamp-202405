import data from '../data/index.js'

const getUserName = () => {
    const user = data.findUser(user => user.username === sessionStorage.username)

    if (user === null) throw new Error('User not found')

    return user.name
}

export default getUserName