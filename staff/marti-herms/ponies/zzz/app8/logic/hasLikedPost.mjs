import data from '../data/index.mjs'

const hasLikedPost = (postId) => {
    const user = data.findUser(user => user.username === sessionStorage.username);

    if (user === null) {
        throw new Error('user not found');
    }

    return user.likedPosts.some(id => id === postId);
}

export default hasLikedPost;