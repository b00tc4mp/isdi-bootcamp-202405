import getAllPosts from './getAllPosts.js'
import getUserName from './getUserName.js'
import getUser from './getUser.js'
import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import toggleLikePost from './toggleLikePost.js'
import updatePostCaption from './updatePostCaption.js'
import createPost from './createPost.js'
import deletePost from './deletePost.js'
import toggleFavPost from './toggleFavPost.js'
import getAllFavPosts from './getAllFavPosts.js'
import toggleFollowUser from './toggleFollowUser.js'
import getAllPoniesPosts from './getAllPoniesPosts.js'

const logic = {
    getAllPosts,
    getUserName,
    registerUser,
    getUser,
    authenticateUser,
    toggleLikePost,
    updatePostCaption,
    createPost,
    deletePost,
    toggleFavPost,
    getAllFavPosts,
    toggleFollowUser,
    getAllPoniesPosts
}

export default logic