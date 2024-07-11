import data from '../data/index.mjs'

import generateId from '../util/generateId.mjs'

const addPost = (img, caption) => {
    if (!img.startsWith('http')) {
        throw new Error('invalidImage');
    }

    const post = {
        id: generateId(),
        img,
        caption,
        author: sessionStorage.username,
        date: new Date().toISOString(),
        likes: []
    };

    data.insertPost(post);

    const user = data.findUser((user) => user.username === sessionStorage.username);

    user.yourPosts.push(post.id);

    data.updateUser((user) => user.username === sessionStorage.username, user)
}

export default addPost;