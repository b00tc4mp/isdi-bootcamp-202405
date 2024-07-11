import data from '../data'

const getAllPosts = () => {
    const posts = data.findPosts(() => true);

    return posts;
}

export default getAllPosts;