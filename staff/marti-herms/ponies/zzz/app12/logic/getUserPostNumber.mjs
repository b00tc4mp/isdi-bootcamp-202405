import data from "../data/index.mjs"

const getUserPostNumber = (username) => {
    const user = data.findUser(user => user.username === username);

    if (user === null) {
        throw new Error('user not found');
    }

    return user.yourPosts.length;
}

export default getUserPostNumber;