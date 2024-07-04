import data from '../data/index.mjs'

const isUserFollowing = (author) => {
    const user = data.findUser(user => user.username === sessionStorage.username);

    if (user === null) {
        throw new Error('user not found');
    }

    return user.following.some(username => username === author);
}

export default isUserFollowing