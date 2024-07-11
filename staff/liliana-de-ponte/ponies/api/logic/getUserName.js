import data from '../data'

const getUserName = () => {
    const user = data.findUser(user => user.username === sessionStorage.username)

    if (user === null) //gestion de errores
        throw new Error('user not found')

    return user.name
}

export default getUserName