const email_regex = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
const name_regex = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const user_regex = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/

function registerUser(name, surname, email, username, password, passwordRepeat) {
    if (!name_regex.test(name.trim()))
        throw new Error('invalid name')

    if (!name_regex.test(surname.trim()))
        throw new Error('ivalid surname')

    if (!email_regex.test(email))
        throw new Error('invalid email')

    if (!user_regex.test(username))
        throw new Error('invalid username')

    if (password.trim().length < 8)
        throw new Error('invalid password')

    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

    const user = users.find(function (user) {
        return user.email === email
    })

    if (user !== undefined)
        throw new Error('email already exists')

    const user = users.find(function (user) {
        return user.username === username
    })

    if (user !== undefined)
        throw new Error('username already exists')

    user = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password
    }

    users.push(user)

    localStorage.users = JSON.stringify(users)
}