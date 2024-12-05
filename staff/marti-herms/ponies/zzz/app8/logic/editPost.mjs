
import data from '../data/index.mjs'

const editPost = (id, newCaption) => {
    if (id.trim().length === 0) {
        throw new Error('invalid postId');
    }

    const post = data.findPost(item => item.id === id);

    if (post === undefined) {
        throw new Error('post not found');
    }

    post.caption = newCaption;

    data.updatePost(post => post.id === id, post);
}

export default editPost;