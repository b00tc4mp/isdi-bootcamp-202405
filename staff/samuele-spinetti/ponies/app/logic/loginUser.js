import data from '../data/index.js'

import validate from '../validate.js'

const loginUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    const user = data.findUser(user => user.username === username)

    if (user === null) throw new Error('username does not exist')

    if (user.password !== password) throw new Error('wrong password')

    sessionStorage.username = username
}

export default loginUser