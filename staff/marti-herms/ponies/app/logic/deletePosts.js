import data from '../data'

const deletePosts = (id) => {
    if (id.trim().length === 0) {
        throw new Error('invalid postId')
    }

    data.deletePost(item => item.id === id)

    data.updateUsers(id)
}

export default deletePosts