import data from "../data"

const getUser = () => {
    const user = data.findUser(user => user.username === sessionStorage.username)

    if (user === null)
        throw new Error('User not found')

    return user
}

export default getUser