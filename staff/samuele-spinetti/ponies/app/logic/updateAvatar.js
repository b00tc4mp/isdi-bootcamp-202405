import data from '../data/index.js'

import validate from '../validate.js'

const updateAvatar = (newAvatar) => {
    validate.image(newAvatar, 'avatar')

    const user = data.findUser(user => user.username === sessionStorage.username)

    if (user === null) throw new Error('User not found')

    user.avatar = newAvatar

    data.updateUser(user => user.username === sessionStorage.username, user)
}

export default updateAvatar