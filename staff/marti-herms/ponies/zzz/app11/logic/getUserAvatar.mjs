import data from "../data/index.mjs"

const getUserAvatar = (username) => {
    const user = data.findUser(user => user.username === username);

    if (user === null) {
        throw new Error('user not found');
    }

    return user.avatar;
}

export default getUserAvatar;