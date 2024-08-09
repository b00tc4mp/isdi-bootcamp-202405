import authenticateUser from './authenticateUser.js'
import createPost from './createPost.js'
import deletePost from './deletePost.js'
import registerUser from './registerUser.js'
import getUserName from './getUserName.js'
import getAllPosts from './getAllPosts.js'
import getAllPoniesPosts from './getAllPoniesPosts.js'
import getAllFavPosts from './getAllFavPosts.js'
import toggleLikePost from './toggleLikePost.js'
import toggleFollowUser from './toggleFollowUser.js'
import toggleFavPost from './toggleFavPost.js'
import updatePostCaption from './updatePostCaption.js'

const logic = {
    authenticateUser,
    createPost,
    deletePost,
    getAllFavPosts,
    getAllPoniesPosts,
    getAllPosts,
    getUserName,
    registerUser,
    toggleFavPost,
    toggleFollowUser,
    toggleLikePost,
    updatePostCaption
}

export default logic