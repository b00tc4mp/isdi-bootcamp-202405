const user_regex = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/

function loginUser(username, password) {
    if (!user_regex.test(username))
        throw new Error('invalid username')

    if (password.trim().length < 8)
        throw new Error('invalid password')

    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

    const user = users.find(function (user) {
        return user.username === username
    })

    if (user === undefined)
        throw new Error('username does not exist')

    if (user.password !== password)
        throw new Error('wrong password')

    sessionStorage.username = username
}