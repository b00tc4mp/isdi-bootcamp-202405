import data from '../data/index.mjs'

const hasPostSaved = (postId) => {
    const user = data.findUser(user => user.username === sessionStorage.username);

    if (user === null) {
        throw new Error('user not found');
    }

    return user.savedPosts.some(id => id === postId);
}

export default hasPostSaved;