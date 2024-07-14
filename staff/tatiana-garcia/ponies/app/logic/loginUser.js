import data from '../data'
import validate from '../validate'

const loginUser = (username, password) => {
    validate.username(username, 'username')
    validate.password(password, 'password')

    const user = data.findUser(user => user.username === username)

    if (user === null)
        throw new Error('username does not exist')

    if (user.password !== password)
        throw new Error('wrong password')

    sessionStorage.username = username
}

export default loginUser

