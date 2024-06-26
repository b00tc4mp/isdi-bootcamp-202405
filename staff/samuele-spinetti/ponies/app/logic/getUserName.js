{
    const getUserName = () => {
        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

        const user = users.find(user => user.username === sessionStorage.username)

        if (user === undefined)
            throw new Error('User not found')

        return user.name
    }

    logic.getUserName = getUserName
}