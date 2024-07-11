import data from '../data'

const updateAvatar = (newAvatar) => {
    if (!newAvatar.startsWith('http')) throw new Error('invalid image')

    const user = data.findUser(user => user.username === sessionStorage.username)

    if (user === null) throw new Error('User not found')

    user.avatar = newAvatar

    data.updateUser(user => user.username === sessionStorage.username, user)
}

export default updateAvatar