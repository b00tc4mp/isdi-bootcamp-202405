import data from "../data/index.js"

const getUserName = (username, targetUsername) => {
    const user = data.findUser(user => user.username === username)

    if (!user)
        throw new Error('user not found')

    const targetUser = data.findUser(user => user.username === targetUsername)

    if (!targetUser) throw new Error('target user not found')

    return targetUser.name
}

export default getUserName