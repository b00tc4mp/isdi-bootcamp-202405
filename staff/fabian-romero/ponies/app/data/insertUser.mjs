function insertUser(user) {
    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

    users.push(user)

    localStorage.users = JSON.stringify(users)
}

export default insertUser