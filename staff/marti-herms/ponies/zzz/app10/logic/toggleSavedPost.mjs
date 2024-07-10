import data from '../data/index.mjs'

const toggleSavedPost = (postID) => {
    const user = data.findUser(user => user.username === sessionStorage.username);

    const postIndex = user.savedPosts.findIndex(id => id === postID);

    if (postIndex !== -1) {
        user.savedPosts.splice(postIndex, 1);
    } else {
        user.savedPosts.push(postID);
    }

    data.updateUser(user => user.username === sessionStorage.username, user);
}

export default toggleSavedPost;