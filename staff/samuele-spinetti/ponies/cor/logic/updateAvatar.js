import data from '../data/index.js'

import validate from '../validate.js'

const updateAvatar = (username, newAvatar) => {
    validate.username(username)
    validate.image(newAvatar, 'avatar')

    const user = data.findUser(user => user.username === username)

    if (user === null) throw new Error('User not found')

    user.avatar = newAvatar

    data.updateUser(user => user.username === username, user)
}

export default updateAvatar