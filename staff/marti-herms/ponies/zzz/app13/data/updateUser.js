function updateUser(condition, user) {
    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

    const postIndex = users.findIndex(condition)

    if (postIndex > -1) {
        users.splice(postIndex, 1, user)

        localStorage.users = JSON.stringify(users)
    }
}

export default updateUser