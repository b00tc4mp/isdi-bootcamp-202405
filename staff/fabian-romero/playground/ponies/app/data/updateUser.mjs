function updateUser(condition, user) {
    const users = localStorage.user !== undefined ? JSON.parse(localStorage.users) : []

    const index = users.findIndex(condition)

    if (index > -1) {
        user.splice(index, 1, user)

        localStorage.users = JSON.stringify(users)
    }
}

export default updateUser