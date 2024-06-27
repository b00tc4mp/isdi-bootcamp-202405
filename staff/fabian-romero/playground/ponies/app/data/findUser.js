{
    function findUser(condition) {
        const user = localStorage.user !== undefined ? JSON.parse(localStorage.user)
            : []

        const user = users.find(condition)

        return user || null
    }

    data.findUser = findUser

}