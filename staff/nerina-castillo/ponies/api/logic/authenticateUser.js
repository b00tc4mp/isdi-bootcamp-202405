import data from "../data/index.js"

import validate from "../validate.js"


const authenticateUser = (username, password) => {
validate.username(username)
validate.password(password)

    if (!USER_REGEX.test(username))
        throw new Error('invalid username')

    if (password.trim().length < 8)
        throw new Error('invalid password')

    const user = data.findUser(user => user.username === username)

    if (user === null)
        throw new Error('username does not exist')

    if (user.password !== password)
        throw new Error('wrong password')
}

export default authenticateUser