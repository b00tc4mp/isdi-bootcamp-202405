import data from '../data/index.mjs'

const getAllPostIDs = () => {
    const posts = data.findPosts(() => true);

    const postIDs = [];

    for (let i = 0; i < posts.length; i++) {
        postIDs.push(posts[i].id);
    }

    return postIDs;
}

export default getAllPostIDs;