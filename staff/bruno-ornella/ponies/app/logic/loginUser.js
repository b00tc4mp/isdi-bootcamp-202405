var USER_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/

function loginUser(username, password) {
    if (!USER_REGEX.test(username))
        throw new Error('invalid username')

    if (password.trim().length < 8)
        throw new Error('invalid password')

    var users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

    var user = users.find(function (user) {
        return user.username === username
    })

    if (user === undefined)
        throw new Error('username does not exist')

    if (user.password !== password)
        throw new Error('wrong password')

    sessionStorage.username = username
}