import data from "../data/index.js"

const getUser = username => {
    const user = data.findUser(user => user.username === username)

    if (user === null)
        throw new Error('User not found')

    return user
}

export default getUser