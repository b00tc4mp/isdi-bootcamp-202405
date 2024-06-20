function getUserName() {
    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

    const user = users.find(function (user) {
        return user.username === sessionStorage.username
    })

    if (user === undefined)
        throw new Error('user not found')

    return user.name
}