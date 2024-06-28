import data from "../data/index.mjs"

const user_regex = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/

const loginUser = (username, password) => {
    if (!user_regex.test(username))
        throw new Error('invalid username')

    if (password.trim().length < 8)
        throw new Error('invalid password')

    const user = data.findUser(user => user.username === username)

    if (user === null)
        throw new Error('username does not exist')

    if (user.password !== password)
        throw new Error('wrong password')

    sessionStorage.username = username
}

export default loginUser