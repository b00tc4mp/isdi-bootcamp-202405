{
    const loginUser = (username, password) => {
        if (username.trim().length < 4)
            throw new Error('invalid username')

        if (password.trim().length < 8)
            throw new Error('invalid password')

        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

        const user = users.find(user => user.username === username
        )

        if (user === undefined)
            throw new Error('username does not exist')

        if (user.password !== password)
            throw new Error('wrong password')

        sessionStorage.username = username
    }

    logic.loginUser = loginUser
}