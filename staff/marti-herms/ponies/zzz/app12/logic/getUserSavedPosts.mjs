import data from '../data/index.mjs'

const getUserSavedPosts = () => {
    const user = data.findUser(user => user.username === sessionStorage.username);

    if (user === null) {
        throw new Error('user not found');
    }

    return data.findPosts(post => user.savedPosts.includes(post.id));
}

export default getUserSavedPosts;