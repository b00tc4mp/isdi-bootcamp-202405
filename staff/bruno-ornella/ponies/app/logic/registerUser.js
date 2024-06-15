var EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
function registerUser(name, surname, email, username, password, passwordRepeat) {


    if (name.trim() === '')
        throw new Error('invalid name')

    if (surname.trim().length < 2)
        throw new Error('invalid surname')

    if (!EMAIL_REGEX.test(email))
        throw new Error('invalid email')

    if (username.trim().length < 4)
        throw new Error('invalid username')

    if (password.trim().length < 8)
        throw new Error('invalid password')

    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    var users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

    var user = users.find(function (user) {
        return user.mail === email
    })

    if (user !== undefined)
        alert('email already exits')

    var user = users.find(function (user) {
        return user.username === username
    })

    if (user !== undefined)
        alert('username already exits')

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
